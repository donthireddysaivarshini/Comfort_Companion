
# 💜Your AI Comfort Companion

*A safe space for your thoughts.*

---

## The Problem: The Silent Struggle

In our fast-paced world, feelings of stress, anxiety, and loneliness are becoming increasingly common. Many people lack a consistent, non-judgmental space to voice their worries and receive immediate comfort. While friends and family are invaluable, they aren't always available, and professional help can be inaccessible or stigmatized. This leaves a critical gap for emotional support—a quiet place to feel heard and validated without fear or judgment.

## Our Solution: A Mother's Unconditional Love, On-Demand

**Comfort Companion** is a revolutionary AI-powered chat application designed to provide the warm, empathetic comfort of a motherly figure, anytime, anywhere. It's more than just a chatbot; it's a carefully crafted companion built to listen, understand, and offer gentle guidance.

Our mission is to provide a safe, nurturing, and accessible space where users can feel heard, validated, and gently guided towards better mental well-being. We've combined cutting-edge AI with a beautifully designed, calming interface to create an experience that feels like a warm embrace.

---
[demo](https://youtube.com/shorts/y30KUuzFi1o?feature=share)
## 🌟 Key Features

*   **Empathetic, Context-Aware Conversations:** Powered by Google's Gemini Pro, Comfort Companion doesn't just respond; it *listens*. It remembers key details from your conversation to provide continuous, context-aware support, making you feel truly seen and heard.
*   **Personalized, Actionable Self-Care:** When you're feeling down, Comfort Companion offers simple, actionable self-care suggestions tailored to your stated emotion. These aren't generic tips; they are thoughtful recommendations retrieved by a custom-built AI tool.
*   **Time-Aware, Proactive Check-ins:** MindMother greets you with a gentle, time-appropriate message, whether it's a bright "Good morning" or a calming "Good evening," making the interaction feel personal from the very first moment.
*   **Beautiful, Calming Interface:** The user interface is intentionally designed with a warm, soothing palette of soft lavender, cream, and gentle mint. Every element, from the rounded message bubbles to the 'Literata' font, is chosen to create a tranquil and safe environment.
*   **Fully Responsive & Accessible:** Built with a mobile-first approach,Comfort Companion offers a seamless, intuitive experience on any device—phone, tablet, or desktop.

## 🤖 How It Was Built: The Tech Stack

Comfort Companion is a modern, full-stack application built with a focus on performance, scalability, and user experience.

*   **Framework:** **Next.js 15 (App Router)** for a high-performance, server-first React application.
*   **Generative AI:** **Google's Genkit** orchestrates our AI flows, leveraging the powerful **Gemini Pro** model for natural, empathetic dialogue.
*   **Styling:** **Tailwind CSS** for a utility-first, responsive design system.
*   **UI Components:** **ShadCN UI** for a set of beautifully designed, accessible, and composable components.
*   **Hosting:** Deployed on **Firebase App Hosting** for scalable, secure, and reliable delivery.

### Innovative AI Implementation

Our use of AI goes beyond simple prompting. We've built a sophisticated system using Genkit flows and tools:

1.  **`empatheticResponseFlow`**: This core flow maintains the context of the conversation, allowing Comfort Companion to reference past messages and provide deeply relevant support.
2.  **`personalizedSelfCareFlow`**: This flow uses a custom AI **Tool** that connects to a "database" of self-care suggestions. The AI determines the user's emotion and uses the tool to retrieve the most appropriate, helpful advice.
3.  **Session-Based Memory**: To enhance personalization without compromising privacy, Comfort Companion uses a session-based memory system, allowing it to remember details within a single conversation for more meaningful follow-ups.

## 🚀 Getting Started

To run Comfort Companion locally:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/donthireddysaivarshini/Comfort_Companion.git]
    cd comfort-companion
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your environment variables:**
    Create a `.env` file in the root and add your Google AI Studio API key:
    ```
    GEMINI_API_KEY=your_api_key_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```


   
## ❤️ Why Comfort Companion Matters

We believe that everyone deserves a space to feel safe and cared for. Comfort Companion is our contribution to a world where mental well-being is prioritized and support is always within reach. It's a testament to how technology can be used for good—to connect, to comfort, and to care.

**Thank you for considering our project.**
