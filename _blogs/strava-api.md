---
title: "Limitations and Uses of the Strava API v3"
date: "2024-09-11"
author: "Zach Robertson"
headerImage: "stravaGraph"
---

I always like to explore the APIs available to websites and services that I use, in this spirit I wrote down my thoughts on the Strava API. Its uses, limitations and pain points I ran into when making a small React component to visualize my elevation and distance metrics over the last 6 months.

## Motivation

I wanted to explore the Strava API and this felt like a good way to figure out what you can and can't do with it. It also let me build more skills at data visualization in React using the `npm` package `Victory`. I would be interested ot see how Victory handles more complex plots but the ability to customize the look of the rendered graphs easily is a major advantage over other data visualization tools I have used. Note that this is really only needed when dynamically generating graphs, if you are using a static dataset just make a graph in Python or powerpoint or something and render it as an image, it will save you a lot of headache.

After exploring the API I will say that this use case is not really the intended use of the API. It is really intended for third-party applications that want to request strava data on behalf of a signed in user, whereas I am using it to only request a single individuals data.

## Use Case

As mentioned previously, my use case is not really a standard one for the strava API. I am building a simple React component to graph my distance and elevation data on a single line-chart. The actual data visualization has nothing to do with the strava API usage, but the data that is visualized on that graphic is delivered from the strava API. My use case is to pull data from strava to visualize but only when new data is available. A normal usage would probably be to let the client (the browser) request strava data on every request (with caching, but in general for each new user -> new strava API request), but for my use this is unecessary as they would be requesting my data which is the same for every client. This means that instead of doing client side requests we need to do server side requests only once when new data is uploaded to strava. This leads me to the first limitation.

- _There is no way to watch for new data_ &rarr; Since there is no callback or anything to trigger an update on the server side when new data is uploaded to strava, we instead need to handle that ourselves

To handle this limitation I decided to use a cron job, this is kind of a _"hacky"_ solution, but I think it cuts down on unnecessary strava API requests in exchange for the data possibly being out of date at some points. For this use case that is not an issue because no one is relying on that data being accurate, in other cases where this data being updated on time was mission critical you would need to take another approach

## Authentication and Authorization

The strava API uses OAuth 2.0 for user authentication and authorization, you can find a detailed explanation of OAuth 2.0 [here](https://oauth.net/2/). I don't want to dive too deep into this, but know that ultimately to request data you need an authorization bearer token that corresponds to your user and has the proper permissions to access the requested data. However, these tokens will expire and you need to re-authenticate to get a new token, so your app needs to handle the case where your requests are rejected for an expired token.

## Available Data

There are a lot of data points displayed on the strava dashboard that are not directly available through the API. For instance the distance and elevation per week are not available, so to get these values you need to loop through all activities and add up the distance/elevation values based on the week that activity happened. Check out the [api docs](https://developers.strava.com/docs/reference/) for a complete set of available queries.

The other caveat about data is the `fitness/freshness/fatigue` values, which are not available via the API even when aggregating data from other requests. This is because these values are calculated in a way that strava does not give use information about, from what I understand it is the same calculation used by training peaks and other apps. My next blog will be about reimplementing this calculating on this blog so stay tuned for that!

## Conclusion

The strava API is mainly used by third-party applications to request data on the users behalf but it is possible to use it for more simple uses, like the strava graph on this blog. You just need to be careful to handle the weirdness of OAuth and client/server side requests so that you are not making unnecessary requests to the strava API or exposing your authentication tokens to the user (This would be bad so do not do this!!)

The other thing to keep in mind is that you may need to aggregate data from the list of activities if the strava API does not provide the data you want directly. And you won't be able to query or calculate (without a lot of knowledge) the `fitness/freshness/fatigue` values, if you are interested in those.
