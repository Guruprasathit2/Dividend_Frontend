import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('chatBox') chatBox!: ElementRef;
  userInput: string = '';
  messages: ChatMessage[] = [];

  sendMessage() {
    if (!this.userInput.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: this.userInput };
    this.messages.push(userMsg);

    const userText = this.userInput;
    this.userInput = '';

    // Simulate AI typing
    const typingMsg: ChatMessage = { role: 'bot', text: 'Typing...' };
    this.messages.push(typingMsg);
    this.scrollToBottom();

    setTimeout(() => {
      // Remove "Typing..." and add actual AI response
      this.messages.pop();
      const aiResponse: ChatMessage = {
        role: 'bot',
        text: `This is AI's reply for: "${userText}" 🤖 (connect backend here)`,
      };
      this.messages.push(aiResponse);
      this.scrollToBottom();
    }, 1000);
  }
  private scrollToBottom() {
    setTimeout(() => {
      this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
    }, 50);
  }
}
