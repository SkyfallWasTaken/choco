# Gateway (WIP)
This is a **WIP** attempt at a Websocket gateway for Discord.
Right now it just does heartbeats (doesn't listen for ACKs atm), the `on` and `once` functions which allow you to listen for events, and a websocket object which you can use to send stuff over the gateway (messages etc)