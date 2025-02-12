export const Chat = {
    "chats": [
      {
        "id": 1,
        "contact": "John",
        "lastMessage": "Hey, how are you?",
        "lastMessageTime": "10:00 AM"
      },
      {
        "id": 2,
        "contact": "Maria",
        "lastMessage": "Do you want to go out tonight?",
        "lastMessageTime": "yesterday"
      },
      {
        "id": 3,
        "contact": "Peter",
        "lastMessage": "I'll be late for the meeting",
        "lastMessageTime": "2 hours ago"
      }
    ]
  }
  
export const UserProfile = 
    {
        "profile": {
          "name": "John",
          "phone": "+123456789",
          "photo": "photo_url",
          "status": "Available",
          "lastSeen": "5 minutes ago"
        }
      }      

export const SpecificChat = {
    "specificChats": [
        {
          "contact": "John",
          "messages": [
            {
              "sender": "John",
              "content": "Hey, how are you?",
              "time": "10:00 AM"
            },
            {
              "sender": "You",
              "content": "I'm good, thanks! How about you?",
              "time": "10:05 AM"
            }
          ]
        },
        {
          "contact": "Maria",
          "messages": [
            {
              "sender": "Maria",
              "content": "Do you want to go out tonight?",
              "time": "yesterday"
            },
            {
              "sender": "You",
              "content": "Sure, where do you want to go?",
              "time": "yesterday"
            }
          ]
        }
      ]
    
}