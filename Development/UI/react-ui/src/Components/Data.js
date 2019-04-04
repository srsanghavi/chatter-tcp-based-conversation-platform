import moment from 'moment';


const john = {
    id: 1,
    username: 'John',
    password: 'password'
};

const ram = {
    id: 2,
    username: 'Ram',
    password: 'password'
};

const himanshu = {
    id: 3,
    username: 'Himanshu',
    password: 'password'
};

const shashwat = {
    id: 4,
    username: 'Shashwat',
    password: 'password'
};

const user_convo1 = {
    users: [john, himanshu],
    conversation_id: 2
};

const user_convo2 = {
    users: [john, ram],
    conversation_id: 3
};

export const group1 = {
    id: 1,
    name: 'Team-208-SP19',
    conversation_id: 1,
    users: [john, ram, himanshu, shashwat]
};

export const message1 = {
    id: 1,
    text: 'Hello World!',
    createdOn: moment().format('MMMM Do YYYY, h:mm:ss a'),
    thread_id: 1,
    sender_id: 1
};

export const message2 = {
    id: 2,
    text: 'hey',
    createdOn: moment().format('MMMM Do YYYY, h:mm:ss a'),
    thread_id: 1,
    sender_id: 2
};

export const message3 = {
    id: 3,
    text: 'hi',
    createdOn: moment().format('MMMM Do YYYY, h:mm:ss a'),
    thread_id: 1,
    sender_id: 3
};

export const message4 = {
    id: 4,
    text: 'hi',
    createdOn: moment().format('MMMM Do YYYY, h:mm:ss a'),
    thread_id: 1,
    sender_id: 4,
};

export const message5 = {
    id: 5,
    text: 'are we meeting tonight?',
    createdOn: moment().format('MMMM Do YYYY, h:mm:ss a'),
    thread_id: 2,
    sender_id: 3,
};

export const message6 = {
    id: 6,
    text: 'yep!',
    createdOn: moment().format('MMMM Do YYYY, h:mm:ss a'),
    thread_id: 2,
    sender_id: 4,
};

export const message7 = {
    id: 7,
    text: 'test',
    createdOn: moment().format('MMMM Do YYYY, h:mm:ss a'),
    thread_id: 3,
    sender_id: 1,
};

export const message8 = {
    id: 8,
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ' +
    'industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and ' +
    'scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into ' +
    'electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of ' +
    'Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus ' +
    'PageMaker including versions of Lorem Ipsum.',
    createdOn: moment().format('MMMM Do YYYY, h:mm:ss a'),
    thread_id: 4,
    sender_id: 3,
};

export const message9 = {
    id: 9,
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ' +
    'industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and ' +
    'scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into ' +
    'electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of ' +
    'Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus ' +
    'PageMaker including versions of Lorem Ipsum.',
    createdOn: moment().format('MMMM Do YYYY, h:mm:ss a'),
    thread_id: 5,
    sender_id: 2,
};

export const message10 = {
    id: 10,
    text: 'thanks!',
    createdOn: moment().format('MMMM Do YYYY, h:mm:ss a'),
    thread_id: 5,
    sender_id: 1,
};

export const message11 = {
    id: 11,
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ' +
    'industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and ' +
    'scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into ' +
    'electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of ' +
    'Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus ' +
    'PageMaker including versions of Lorem Ipsum.',
    createdOn: moment().format('MMMM Do YYYY, h:mm:ss a'),
    thread_id: 6,
    sender_id: 1,
};

export const message12 = {
    id: 12,
    text: ':)',
    createdOn: moment().format('MMMM Do YYYY, h:mm:ss a'),
    thread_id: 7,
    sender_id: 1,
};


export const thread1 = {
    id: 1,
    conversation_id: 1,
    messages: [message1, message2, message3, message4]
};

export const thread2 = {
    id: 2,
    conversation_id: 1,
    messages: [message5, message6]
};

export const thread3 = {
    id: 3,
    conversation_id: 1,
    messages: [message7]
};

export const thread4 = {
    id: 4,
    conversation_id: 2,
    messages: [message8]
};

export const thread5 = {
    id: 5,
    conversation_id: 3,
    messages: [message9, message10]
};

export const thread6 = {
    id: 6,
    conversation_id: 2,
    messages: [message11]
};

export const thread7 = {
    id: 7,
    conversation_id: 3,
    messages: [message12]
};



export const conversation1 = {
    id: 1,
    threads: [thread1, thread2, thread3]
};

export const conversation2 = {
    id: 2,
    threads: [thread4, thread6]
};

export const conversation3 = {
    id: 3,
    threads: [thread5, thread7]
};


export const users = [john, ram, himanshu, shashwat];

export const groups = [group1];

export const users_converses_users = [user_convo1, user_convo2];

export const messages = [message1, message2, message3, message4, message5, message6, message7, message8, message9];

export const threads = [thread1, thread2, thread3, thread4, thread5];


export const conversations = [conversation1, conversation2, conversation3];



const DataService = {

    getUserByUsernameAndPassword: (username, password) => {
        const user = users.find(user => user.username === username && user.password === password);
        return Promise.resolve(user)
    },

    getConversationsForUser: id => {
        let userConversations = [];
        groups.map(group => {
            if (group.users.filter(user => user.id === id).length > 0) {
                userConversations.push(conversations.find(conv => conv.id === group.conversation_id))
            }
            return;
        });
        users_converses_users.map(convo => {
            if(convo.users.filter(user => user.id === id).length > 0) {
                userConversations.push(conversations.find(conv => conv.id === convo.conversation_id))
            }
        });
        return Promise.resolve(userConversations)
    },

    getUserById: id => {
        return Promise.resolve(users.find(user => user.id === id))
    },

    getGroupOrUserByConversationId: id => {
        if(groups.find(group => group.conversation_id === id) === undefined) {
            return Promise.resolve(users_converses_users.find(conv => conv.conversation_id === id));
        } else {
            return Promise.resolve(groups.find(group => group.conversation_id === id));
        }
    },

    isGroupConversation: id => {
        if(groups.filter(group => group.conversation_id === id).length > 0) {
            return true;
        } else {
            return false;
        }
    },

    isUserConversation: id => {
        if(users_converses_users.filter(conv => conv.conversation_id === id).length > 0) {
            return true;
        } else {
            return false;
        }
    },

    getThreadsForConversation: id => {
        let conversation = conversations.find(conv => conv.id === id);
        return Promise.resolve(conversation.threads)
    },

    addThreadToConversation: (id, thread) => {
        conversations.find(conversation => conversation.id === id).threads.push(thread)
    }
};


export default DataService;