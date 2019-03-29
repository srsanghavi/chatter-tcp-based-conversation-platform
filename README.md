# Chat Server for team-208-SP19
## Team Members
- Himanshu Budhiah (budhiahimanshu96)
- Ram Prakash Arivu Chelvan (ramprakash)
- Shashwat Sanghavi (sanghavis)
- John Goodacre (jgoodacre)

## Description

We've built a ChatServer that can communicate and coordinate message communication with different clients.
- The ChatServer code can be found in Development/ChatServer
- The Client code can be found in Development/UI

The ChatServer was built over the Prattle base code and fully written in Java.
+ Websockets are used to communicate with Clients
+ Uses an API Layer to parse messages and trigger appropriate action
+ Supports Users, Groups, Conversations and Messages
+ Users are authenticated before application access
+ Groups contain conversations and can be password protected
+ Threads are essentially a group of messages that exist in a conversation. They are meant to provide context to a running conversation between users
+ Messages can be broadcast to other individual users in the platform
+ MySQL database and the Server hosted on EC2 Instances on AWS

The Client was built using React and it connects to the Server using websocket
A User would be able to:
+ Create a new account / Sign in to an existing account
+ Create new groups
+ Send messages to other users
+ Send messages in Groups
+ Broadcast messages to other users
+ Find other users/groups in the service, if they can be found
+ Mark oneself as a Private user
+ Delete a Group
+ Retrieve old messages when online

## Demo

<a href="https://drive.google.com/file/d/1szK1d0xhhI-7Br-wzWR_tJgZZ4Qgm1Up/view" target="_blank"><img src="screenshot.png" 
alt="Demo" width="400" height="300" border="10" /></a>

## Development

- Sprint 1 - High level design, generation of ERD and UML diagrams, user stories and feature choices, working tests for the base code
- Sprint 2 - DB creation and server setup, backend work to support the planned features, basic client communication to test user-user messaging
- Sprint 3 - Server setup on AWS, Client development in React and interfacing the client with the server and lending backend support in this process


## Design Patterns and Techniques

- Singleton
- Factory Method
- Dependency Injection

