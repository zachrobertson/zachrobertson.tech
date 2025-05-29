---
title: "Maiar: Beginners guide"
date: "2025-04-05"
author: "Zach Robertson"
"shortDescription": "Beginners guide to using the maiar-ai agentic framework"
---

## Table of Contents
- [Maiar Framework](#maiar-framework)
  - [Data Ingestion and Triggers](#data-ingestion-and-triggers)
  - [Decision-making](#decision-making)
  - [Action Execution](#action-execution)
- [Using Maiar Framework](#using-the-maiar-framework)

## Maiar Framework

If you have not already you should read the [Maiar Whitepaper](https://maiar.dev/maiar.pdf) to get a good idea of what this framework is trying to do. The main idea of Maiar is to be an extremely
flexible and extensible AI agent framework that allows for complex agent behavior without the limitations imposed by a number of other agent frameworks. It is based on the idea of [Unix pipes](https://en.wikipedia.org/wiki/Pipeline_(Unix)).

Like described in the whitepaper, the framework assumes that agents consist of three steps
- data ingestion and triggers -> _How the agent is provided context and prompted to perform a task_
- decision-making -> _Determining from context what tasks to perform_
- action execution -> _Ability (more on that later) to execute tasks_

To achieve this Maiar is constructed of the following components:
- _Runtime_: The core of the Maiar framework that handles context creation, decision making and plugin orchestration
- _Plugins_: A collection of triggers (event listeners) and executors (actions) that the runtime can utilize
- _Model Providers_: An abstract layer for integrating AI models (of any modality) with a single standardized interface
- _Memory Provider_: Storage system for maintaining context through the agent lifecycle

### Data Ingestion and Triggers

To give machine learning models the ability to act as agents we need to give them the context to do [decision making](#decision-making) and a way to tell the model to start acting, 
or under what conditions actions should be performed. This is the first step of the agent behavior for Maiar and is implemented in two places.

_Triggers_: These are configured on the plugin level. Plugins define functions that should run on certain lifecycle events, and soon they will be configurable 
so that the triggers can be activated for more generic events.
_Data Ingestion_: The runtime itself constructs context using memory provider methods which plugins can utilize to add history or context to storage. Basically the 
plugins generate data that the runtime will use to construct context.

### Decision Making

This is one of the most important pieces to the Maiar framework. Most other agent frameworks fall into one of the following categories:
- _Fixed Pipeline Architecture_: Typically means for every user input there is a predetermined chain of operations to be performed. This is a good way to get clear and predictable results 
but limits agent behavior to simple predefined loops of actions.
- _Monolithic Architecture_: Agent logic is implemented as a single tightly coupled system. This makes it very hard to extend capabilities, often requiring submitting a PR to the framework 
to get whatever functionality you need.
- _Rule-Based Systems_: Frameworks that rely on predefined rules and decision trees to determine agent behavior. These lack the ability to handle novel situations that might not be defined 
in the rules or decision tree.

Maiar addresses these issues by implementing the following features:
- _Plugin-First Architecture_: Every capability the agent has access to is defined in a plugin. This means that adding a new capability to an agent is as simple as creating a new plugin, 
or extending an existing plugin to add a new executor or trigger. This means no PR to the Maiar framework is required for implementing new capabilities.
- _Dynamic Pipeline Construction_: Instead of the framework using a fixed set of operations the runtime generates the pipeline steps based on the context.
- _Unix-Style Composition_: Implements a standard interface for plugins to interact with the context chain.

These three features create a framework that allows for complex agent behavior to emerge from a simple combination of capabilities, and allows the models used by the runtime to make decisions 
based on context as to what plugin capabilities should be used to perform the requested action.

### Action Execution

Performing actions is what makes an agent more than just the underlying model, it gives the agent the ability to interact and manipulate resources outside of the scope of the model used 
by the runtime. Like described above, many of agent frameworks have these actions built into the framework and require decision trees or rules to determine when an action should be executed.

Maiar changes this paradigm by allowing plugins to define their capabilities with a standard interface that the runtime can then interpret and use. It does this through a few mechanisms, first 
there is the plugin registry which is how the runtime collects and manages plugins during initalization. Plugin triggers and capabilities are added to the registry and this information is passed 
to the runtime when it generates a pipeline. The other mechanism is through the `helpfulInstructions`/`description` of the plugin capabilities, this is where the plugin developer will define the 
use case for the capability in a way that is understandable to the model used by the runtime. These instructions inform the runtime about when a capability should be used in a pipeline step.
In (creating plugins)[#creating-plugins] there is an example of how to define plugin capabilities through executors and triggers.

## Using the Maiar Framework

[GitHub Repo](https://github.com/UraniumCorporation/maiar-ai)

Read through the README for the `maiar-ai` repo to understand how to setup your project.

Below is an example of a simple agent configuration. It has access to the OpenAI model provider, an SQLite memory provider and plugins for text generation and terminal based interactions.
The advantage of this type of configuration is that to add new capabilities to the model you just add new plugins or model providers.

<details>
  <summary>Code example</summary>


  ```ts
  import "dotenv/config";

  import path from "path";

  import { createRuntime } from "@maiar-ai/core";

  import { OpenAIProvider } from "@maiar-ai/model-openai";

  import { SQLiteProvider } from "@maiar-ai/memory-sqlite";

  import { PluginTerminal } from "@maiar-ai/plugin-terminal";
  import { PluginTextGeneration } from "@maiar-ai/plugin-text";

  const runtime = createRuntime({
    models: [
      new OpenAIProvider({
        apiKey: process.env.OPENAI_API_KEY as string,
        model: "gpt-3.5-turbo"
      })
    ],
    memory: new SQLiteProvider({
      dbPath: path.join(process.cwd(), "data", "conversations.db")
    }),
    plugins: [
      new PluginTextGeneration(),
      new PluginTerminal({ user: "test", agentName: "maiar-starter" })
    ],
    capabilityAliases: []
  });

  // Start the runtime
  console.log("Starting agent...");
  runtime.start().catch((error) => {
    console.error("Failed to start agent:", error);
    process.exit(1);
  });

  // Handle shutdown gracefully
  process.on("SIGINT", async () => {
    console.log("Shutting down agent...");
    await runtime.stop();
    process.exit(0);
  });
  ```
</details>

### Plugins

Plugins are the essential tool in Maiar that allows us to add new capabilities to an agent with no modifications to Maiar itself. In the example above you can see how this is done, to add a new capability to the agent you add an instance of 
a plugin to the `plugins` array. The runtime itself then handles registration of the plugin capabilities so they can be used to generate pipelines.

#### Creating a Plugin

Plugins can be incredibly simple or very complex depending on the capability they are attempting to implement. Below is an example from the core Maiar repo that provides the capability to interact with the agent via the command line.

The core of the plugins are the `executors` and `triggers`.
- _Executors_: Actions that the model can perform, they accept the current agent context as input
- _Triggers_: Events that prompt the runtime to generate a new pipeline or perform a lifecycle action

<details>
  <summary>Code example from <code>plugin-terminal</code> package</summary>

  ```ts
  import * as fs from "fs";
  import * as net from "net";

  import {
    AgentContext,
    Plugin,
    PluginResult,
    UserInputContext
  } from "@maiar-ai/core";

  import { CHAT_SOCKET_PATH } from "./index";
  import { generateResponseTemplate } from "./templates";
  import { TerminalPluginConfig, TerminalResponseSchema } from "./types";

  interface TerminalPlatformContext {
    platform: string;
    responseHandler: (response: unknown) => void;
    metadata?: Record<string, unknown>;
  }

  export class TerminalPlugin extends Plugin {
    private server: net.Server | null = null;
    private clients: Set<net.Socket> = new Set();

    constructor(private config: TerminalPluginConfig) {
      super({
        id: "plugin-terminal",
        name: "Terminal Plugin",
        description:
          "Handles terminal-based chat interaction. This plugin is used to receive messages from the user over terminal. All messages recieved over terminal must be sent to the user in the terminal as the very last action you perform. It is called send_response under the plugin-terminal namespace. You must make this your last action if the incoming message is from the terminal plugin.",
        requiredCapabilities: []
      });
      this.config = config;

      // Ensure socket cleanup on process exit
      process.on("SIGINT", () => this.cleanup());
      process.on("SIGTERM", () => this.cleanup());
      process.on("exit", () => this.cleanup());

      this.executors = [
        {
          name: "send_response",
          description: "Send a response to connected terminal clients",
          fn: this.sendResponse.bind(this)
        }
      ];

      this.triggers = [
        {
          name: "terminal_server",
          start: this.startServer.bind(this)
        }
      ];
    }

    private async sendResponse(context: AgentContext): Promise<PluginResult> {
      const platformContext = context?.platformContext as TerminalPlatformContext;
      if (!platformContext?.responseHandler) {
        this.logger.error("no response handler available");
        return {
          success: false,
          error: "No response handler available"
        };
      }

      try {
        // Format the response based on the context chain
        const formattedResponse = await this.runtime.operations.getObject(
          TerminalResponseSchema,
          generateResponseTemplate(context.contextChain),
          { temperature: 0.2 }
        );

        await platformContext.responseHandler(formattedResponse.message);
        return {
          success: true,
          data: {
            message: formattedResponse.message,
            helpfulInstruction:
              "This is the formatted response sent to the terminal"
          }
        };
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        this.logger.error("error sending response:", { error: err.message });
        return {
          success: false,
          error: "Failed to send response"
        };
      }
    }

    private async startServer(): Promise<void> {
      this.logger.info("starting terminal server...");

      if (this.server) {
        this.logger.warn("terminal server already running");
        return;
      }

      // Remove existing socket file if it exists
      this.cleanup();

      try {
        this.server = net.createServer((socket) => {
          this.logger.info("new client connected");
          this.clients.add(socket);

          socket.on("data", async (data) => {
            try {
              const { message, user, type } = JSON.parse(data.toString());
              if (!message && !type) return;

              // Handle config request from chat client
              if (type === "get_config") {
                socket.write(JSON.stringify(this.config));
                return;
              }

              this.logger.info(`received message from ${user}`, {
                user,
                message
              });

              // Create new context chain with initial user input
              const initialContext: UserInputContext = {
                id: `${this.id}-${Date.now()}`,
                pluginId: this.id,
                action: "receive_message",
                type: "user_input",
                content: message,
                timestamp: Date.now(),
                rawMessage: message,
                user: user || "local"
              };

              // Create response handler that handles type conversion
              const responseHandler = (response: unknown) => {
                const responseStr =
                  typeof response === "string"
                    ? response
                    : JSON.stringify(response);

                this.logger.info(`sending response to clients`, {
                  response: responseStr
                });

                for (const client of this.clients) {
                  client.write(
                    JSON.stringify({
                      message: responseStr,
                      user: "maiar"
                    }) + "\n"
                  );
                }
              };

              // Create event with initial context and response handler
              const platformContext: TerminalPlatformContext = {
                platform: this.id,
                responseHandler,
                metadata: {
                  helpfulInstruction:
                    "This is a terminal chat message. This means you must send a response to the user in the terminal as the very last action you perform. It is called send_response under the plugin-terminal namespace."
                }
              };

              await this.runtime.createEvent(initialContext, platformContext);
            } catch (err: unknown) {
              const error = err instanceof Error ? err : new Error(String(err));
              this.logger.error("error processing message:", {
                error: error.message
              });
              socket.write("Error processing message. Please try again.\n");
            }
          });

          socket.on("end", () => {
            this.logger.info("client disconnected");
            this.clients.delete(socket);
          });

          socket.on("error", (error) => {
            this.logger.error("socket error:", { error: error.message });
            this.clients.delete(socket);
          });
        });

        this.server.listen(CHAT_SOCKET_PATH, () => {
          // Set socket permissions to be readable/writable by all users
          fs.chmodSync(CHAT_SOCKET_PATH, 0o666);
          this.logger.info(`server listening on ${CHAT_SOCKET_PATH}`, {
            socketPath: CHAT_SOCKET_PATH
          });
          this.logger.info("to connect, run: pnpm maiar-chat");
        });

        this.server.on("error", (error) => {
          this.logger.error("server error:", { error: error.message });
        });
      } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error(String(err));
        this.logger.error("failed to start server:", { error: error.message });
      }
    }

    public async init(): Promise<void> {}

    public async shutdown(): Promise<void> {
      if (fs.existsSync(CHAT_SOCKET_PATH)) {
        fs.unlinkSync(CHAT_SOCKET_PATH);
      }
    }

    private cleanup(): void {
      if (fs.existsSync(CHAT_SOCKET_PATH)) {
        fs.unlinkSync(CHAT_SOCKET_PATH);
      }
    }
  }
  ```
</details>

### Model Providers

Model providers are wrappers around APIs or local model instances that provide a standard interface for the
runtime to interact with models. This gives us the ability to configure Maiar agents with any model we want or
to use models from multiple different providers. For instance you could configure the agent to have an OpenAI model
provider and an Anthropic model provider, then you could use Claude for the agent decision making and Dalle for 
image generation.

#### Anatomy of a Model Provider

Model provider expose their functionality through the concept of `capabilities`. In each model provider developers must
specify what capabilities the model provider has and what the functionality of that capability is. For each here is the current
OpenAI mdoel provider (_Note: Maiar is still pre v1 so this is likely to change_).

In the OpenAI model provider example we are defining a text generation and image generation capability for the agent.
These capabilities cannot be directly used by the agent, they instead need to be consumed by a [Plugin](#plugins) to \
expose the functionality to the agent. This is a bit of overhead when it comes to testing new capabilities, but it fixes the
issues of different model providers having different specifications for their capabilities, which can be made general in a plugin.

<details>
  <summary>Code example from the <code>OpenAIModelProvider</code></summary>

  ```ts
  import OpenAI from "openai";
  import { z } from "zod";

  import { ModelProvider, ModelRequestConfig } from "@maiar-ai/core";

  import {
    imageGenerationSchema,
    OpenAIConfig,
    OpenAIImageGenerationModel,
    OpenAIModel,
    OpenAIModelRequestConfig,
    OpenAITextGenerationModel,
    textGenerationSchema
  } from "./types";
  import {
    IMAGE_GENERATION_CAPABILITY_ID,
    TEXT_GENERATION_CAPABILITY_ID
  } from "./types";

  // Helper functions to check model types
  const isTextGenerationModel = (
    model: OpenAIModel
  ): model is OpenAITextGenerationModel => {
    return Object.values(OpenAITextGenerationModel).includes(
      model as OpenAITextGenerationModel
    );
  };

  const isImageGenerationModel = (
    model: OpenAIModel
  ): model is OpenAIImageGenerationModel => {
    return Object.values(OpenAIImageGenerationModel).includes(
      model as OpenAIImageGenerationModel
    );
  };

  // Constants for provider information
  const PROVIDER_ID = "openai";
  const PROVIDER_NAME = "OpenAI";
  const PROVIDER_DESCRIPTION = "OpenAI API models like GPT-4 and GPT-3.5";

  export class OpenAIModelProvider extends ModelProvider {
    private client: OpenAI;
    private models: OpenAIModel[];

    constructor(config: OpenAIConfig) {
      super({
        id: PROVIDER_ID,
        name: PROVIDER_NAME,
        description: PROVIDER_DESCRIPTION
      });
      this.client = new OpenAI({ apiKey: config.apiKey });
      this.models = config.models;

      if (this.models.some(isTextGenerationModel)) {
        this.addCapability({
          id: TEXT_GENERATION_CAPABILITY_ID,
          name: "Text generation capability",
          description: "Generate text completions from prompts",
          input: textGenerationSchema.input,
          output: textGenerationSchema.output,
          execute: this.generateText.bind(this)
        });

        this.logger.info("add text generation capability", {
          type: "openai.model.capability.registration",
          model: this.id,
          capability: "text-generation",
          inputSchema: textGenerationSchema.input,
          outputSchema: textGenerationSchema.output
        });
      }

      if (this.models.some(isImageGenerationModel)) {
        this.addCapability({
          id: IMAGE_GENERATION_CAPABILITY_ID,
          name: "Image generation capability",
          description: "Generate images from prompts",
          input: imageGenerationSchema.input,
          output: imageGenerationSchema.output,
          execute: this.generateImage.bind(this)
        });

        this.logger.info("add image generation capability", {
          type: "openai.model.capability.registration",
          model: this.id,
          capability: "image-generation",
          inputSchema: imageGenerationSchema.input,
          outputSchema: imageGenerationSchema.output
        });
      }
    }

    public async init(): Promise<void> {}

    public async checkHealth(): Promise<void> {
      // Verifying if we can call the API
      try {
        await this.executeCapability(
          TEXT_GENERATION_CAPABILITY_ID,
          "[SYSTEM HEALTH CHECK] are you alive? please response with 'yes' only",
          {
            temperature: 0.7,
            maxTokens: 5
          }
        );
      } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error(String(err));
        throw new Error(
          `health check failed for model provider ${this.id}: ${error.message}`
        );
      }
    }

    public async shutdown(): Promise<void> {}

    public async generateImage(
      prompt: string,
      config?: OpenAIModelRequestConfig
    ): Promise<z.infer<typeof imageGenerationSchema.output>> {
      const response = await this.client.images.generate({
        prompt: prompt,
        n: config?.n ?? 1,
        size: config?.size ?? "1024x1024"
      });

      if (response.data.length !== (config?.n ?? 1)) {
        throw new Error("Unexpected number of images generated");
      }

      const urls = response.data.map((image) => image.url).filter(Boolean);
      const filteredUrls = urls.filter((url) => url !== undefined);

      if (filteredUrls.length === 0) {
        throw new Error("No valid image URLs generated");
      }

      return filteredUrls;
    }

    public async generateText(
      prompt: string,
      config?: ModelRequestConfig
    ): Promise<z.infer<typeof textGenerationSchema.output>> {
      try {
        const textModel = this.models.find(isTextGenerationModel);

        if (!textModel) {
          throw new Error("No text generation model configured");
        }

        const completion = await this.client.chat.completions.create({
          model: textModel,
          messages: [{ role: "user", content: prompt }],
          temperature: config?.temperature ?? 0.7,
          max_tokens: config?.maxTokens,
          stop: config?.stopSequences
        });

        const content = completion.choices[0]?.message?.content;
        if (!content) {
          throw new Error("No content in response");
        }

        // Log the interaction
        this.logger.info({
          type: "model.provider.interaction",
          message: `model provider ${this.id} executed capability text-generation`,
          metadata: {
            modelId: this.id,
            capabilityId: "text-generation",
            input: prompt,
            output: content
          }
        });

        return content;
      } catch (error) {
        this.logger.error("error executing capability text-generation on model", {
          type: "model_error",
          modelId: this.id,
          capabilityId: "text-generation",
          error: error instanceof Error ? error.message : String(error)
        });

        throw error;
      }
    }
  }
  ```
</details>
