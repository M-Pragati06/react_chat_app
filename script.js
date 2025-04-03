// DOM elements
const chatList = document.getElementById("chatList");
const chatContent = document.getElementById("chatContent");
const sendMessageButton = document.getElementById("sendMessage");
const messageInput = document.getElementById("messageInput");
const chatTitle = document.getElementById("chatTitle");
const typingIndicator = document.getElementById("typingIndicator");
const emojiPickerButton = document.querySelector(".emoji-picker");
const emojiContainer = document.getElementById("emojiContainer");

// User data
const users = [
  {
    id: 1,
    name: "John Doe",
    avatar: "images/profile1.jpeg",
    messages: [],
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "images/profile2.jpeg",
    messages: [],
  },
  {
    id: 3,
    name: "Jack Obey",
    avatar: "images/profile3.jpeg",
    messages: [],
  },
];

let activeUser = null;
let typingTimeout;

// Load the chat list into the UI
function loadChatList() {
  chatList.innerHTML = users
    .map((user) => {
      const lastMessage =
        user.messages.length > 0
          ? user.messages[user.messages.length - 1].text
          : "No messages yet";
      return `<div class="chat-preview" data-id="${user.id}">
        <img src="${user.avatar}" alt="${user.name}" class="rounded-circle me-2" />
        <div class="chat-info">
          <span class="chat-name">${user.name}</span>
          <small class="last-message">${lastMessage}</small>
        </div>
      </div>`;
    })
    .join("");
}

// Load chat messages for the selected user
function loadChat(user) {
  activeUser = user;
  chatTitle.textContent = user.name;
  document.getElementById("chatAvatar").src = user.avatar; // Set profile image

  // Display the user's messages
  chatContent.innerHTML = user.messages
    .map((msg) => {
      // Format the time
      const messageTime = new Date(msg.time);
      const timeString = messageTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Determine the avatar and alignment based on the sender
      const isUser = msg.sender === "user";
      return `
        <div class="message ${isUser ? "user" : "other"}">
          <div class="message-avatar">
            <img src="${
              isUser ? "images/sample-avatar.jpg" : user.avatar
            }" alt="Avatar" class="rounded-circle" width="30" height="30">
          </div>
          <div class="message-bubble">
            <p>${msg.text}</p>
            <small class="message-time">${timeString}</small>
          </div>
        </div>
      `;
    })
    .join("");

  // Auto-scroll to the latest message
  chatContent.scrollTop = chatContent.scrollHeight;
}

// Array of random replies to simulate responses
const randomReplies = [
  "I'm not sure about that.",
  "That's a great question!",
  "Let me think about it.",
  "Can you clarify a bit?",
  "Interesting, tell me more!",
  "Hmm, I don't know about that.",
  "That sounds cool!",
  "I need to check on that.",
  "Let's talk about it later.",
  "Haha, good one!",
];

//Send Message Function
function sendMessage() {
  if (activeUser && messageInput.value.trim()) {
    // User sends a message
    const timestamp = new Date(); // Capture the current time
    activeUser.messages.push({
      sender: "user",
      text: messageInput.value.trim(),
      time: timestamp, // Store the timestamp
    });
    messageInput.value = ""; // Clear the input field
    moveToRecent(activeUser); // Move active user to the top of the list
    loadChat(activeUser); // Reload the chat with the new message
    loadChatList(); // Update the chat list with the last message

    // Show typing indicator and simulate a reply after a delay
    showTypingIndicator(true);

    // Simulate a random reply after 1.5 seconds
    setTimeout(() => {
      const randomReply =
        randomReplies[Math.floor(Math.random() * randomReplies.length)];
      activeUser.messages.push({
        sender: "other",
        text: randomReply,
        time: new Date(), // Store the timestamp for the reply
      });
      moveToRecent(activeUser); // Move active user to the top of the list again
      loadChat(activeUser); // Reload chat with the random reply
      loadChatList(); // Update the chat list with the reply
      showTypingIndicator(false); // Hide typing indicator
    }, 1500); // 1.5 second delay for simulated reply
  }
}

// move To Recent
function moveToRecent(user) {
  // Remove the user from the current position
  const index = users.findIndex((u) => u.id === user.id);
  if (index !== -1) {
    users.splice(index, 1); // Remove the user
    users.unshift(user); // Add the user to the beginning
  }
}

// Show or hide the typing indicator
function showTypingIndicator(isTyping) {
  if (isTyping) {
    typingIndicator.classList.remove("d-none");
  } else {
    typingIndicator.classList.add("d-none");
  }
}

// Emoji picker toggle
emojiPickerButton.addEventListener("click", () => {
  emojiContainer.classList.toggle("d-none");
  if (!emojiContainer.classList.contains("d-none")) {
    emojiContainer.innerHTML = [
      "😀",
      "😁",
      "😂",
      "🤣",
      "😊",
      "😍",
      "😎",
      "😜",
      "🤔",
      "😢",
    ]
      .map((emoji) => `<button class="btn btn-sm">${emoji}</button>`)
      .join("");
  }
});

// Add selected emoji to the message input field
emojiContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    messageInput.value += e.target.textContent; // Append emoji to input
  }
});

// Close emoji picker when clicking outside
document.addEventListener("click", (e) => {
  if (
    !emojiPickerButton.contains(e.target) &&
    !emojiContainer.contains(e.target)
  ) {
    emojiContainer.classList.add("d-none"); // Hide emoji container
  }
});

// Load chat when a user preview is clicked
chatList.addEventListener("click", (e) => {
  const userId = e.target.closest(".chat-preview")?.getAttribute("data-id");
  if (userId) {
    const user = users.find((u) => u.id == userId);
    loadChat(user); // Load selected user's chat
    enableChatInput(true); // Enable chat input
  }
});

// Toggle theme between modern and classic
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("modern-theme");
  document.body.classList.toggle("classic-theme");

  // Update theme toggle button text based on the current theme
  const currentTheme = document.body.classList.contains("modern-theme")
    ? "Classic"
    : "Modern";
  document.getElementById("theme-toggle").textContent = currentTheme;
});

// Set the initial theme to Classic on page load
document.body.classList.add("classic-theme"); // Default theme

// Enable or disable chat input
function enableChatInput(enable) {
  messageInput.disabled = !enable;
  sendMessageButton.disabled = !enable;
}

// Send message when button is clicked
sendMessageButton.addEventListener("click", sendMessage);

// Initial load of chat list
loadChatList();
