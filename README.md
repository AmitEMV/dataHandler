# Data Handler
A simple node server which accepts the memory usage data published from a Windows client. This then publishes the data to a Redis write instance as a Time Series data stream. 
Redis is configured to replicate to a Read Only instance from which the Grafana instance reads the published memory data and generates the graph/visualization. 
Alerts are configured in Grafana to publish to Slack if the memory usage goes beyond the set threshold.

Here's a screenshot of the Grafana dashboard showing the memory usage on the client machine
![Grafana dashboard for systemmemory usage](https://github.com/AmitEMV/dataHandler/blob/main/screenshots/High%20memory%20usage.png?raw=true)
