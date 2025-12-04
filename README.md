
##  Project Links

-   **Live Deployed App:** [https://ai-platform-two-rosy.vercel.app/](https://ai-platform-two-rosy.vercel.app/)
    
-   **Figma UI Design:** [https://www.figma.com/design/mknhw0XKzA0egZ0taGIeUC/Untitled?node-id=1-2&t=BcOcADFFEqCyydKy-1](https://www.figma.com/design/mknhw0XKzA0egZ0taGIeUC/Untitled?node-id=1-2&t=BcOcADFFEqCyydKy-1)
## Part 1 — Comparative UI Research

### AI Platforms Analyzed

Reviewed UI/UX patterns from the following current-gen AI interfaces:

1.  **OpenAI (ChatGPT) & Gemini**
    
    -   **Strength — Invisible Interface**
        
        -   Minimal UI, focus remains on conversation.
            
        -   Centered input field creates a clear “Start Here” experience.
            
    -   **Weakness — Hidden Complexity**
        
        -   No visible control for temperature or tokens.
            
    -   **Decision**
        
        -   Reject hidden settings (user needs quick control).
            
        -   Adopt greeting state with centered input + suggested prompts.
            
2.  **Claude by Anthropic**
    
    -   **Strength — Polished Typography & Feel**
        
        -   Warm color palette, serif fonts → less “sterile”.
            
        -   Input field designed as a floating card.
            
    -   **Weakness — Fixed Input Position**
        
        -   Not ideal for flexible layouts across devices.
            
    -   **Decision**
        
        -   Adopt floating input card + refined typography.
            
        -   (Future enhancement: Claude-style “Artifacts” feature).
            
3.  **DeepSeek & Perplexity**
    
    -   **Strength — Functional Controls**
        
        -   Toggles like “Search mode” or “DeepThink” near input.
            
    -   **Decision**
        
        -   Place key parameters (or settings toggle) next to send button.
            
        -   Expand into a compact menu → not buried in navigation.
            
4.  **Hugging Face**
    
    -   **Weakness — Overly Technical & Dense**
        
        -   Model directory layout is cluttered for chat UX.
            
    -   **Strength → Opportunity**
        
        -   Good metadata display for model size/parameters.
            
    -   **Decision**
        
        -   Reject grid-style dashboard for core chat area.
            
        -   Use model badges (e.g., “70B params”) in selector.
            

----------

## Part 2: UI Decisions - Why Select vs. Why Reject


| Feature | Selected Approach | Rejected Approach | The "Why" (Reasoning) |
| :--- | :--- | :--- | :--- |
| **History Icons** | **Minimalistic Outlined Icons** (Lucide `MessageSquare`). | **Solid/Filled or Generic Icons**. | **Aesthetics & Cognitive Load.** Solid icons feel "heavy" and distract the eye. Outlined icons (1px stroke) blend into the dark background, maintaining the "invisible interface" feel until hovered. |
| **Code Display** | **Syntax Highlighting** (VS Code Dark theme). | **Monochrome/Plain Text Blocks**. | **Readability & Professionalism.** Plain text blocks are unreadable for complex logic. Using industry-standard highlighting (keywords in purple/blue, strings in orange) leverages existing developer muscle memory for faster scanning. |
| **Model Selector** | **Dropdown inside Input Area** (Perplexity/Claude style). | **Top-Left Sidebar Header** (ChatGPT style). | **Mobile Usability.** Reaching the top-left on a phone is hard. Placing the model picker inside or right above the text box makes it easy to switch models just before typing without breaking flow. |
| **Parameters** (Temp/Tokens) | **Collapsible "Inspector" Panel** (Right side). | **Always-on Sliders** or **Modal Popups**. | **Screen Real Estate.** You don't want sliders cluttering the chat view 100% of the time. A "Right Sidebar" (like VS Code) allows power users to tweak settings without blocking the chat history. |
| **Theme Toggle** | **Icon in Top Right** (Standard). | **Hidden in Settings Menu**. | **Accessibility.** Users switch lighting conditions frequently (e.g., day vs. night coding); it should be one click away, not buried in menus. |
| **Prompt Editor** | **Auto-expanding Textarea** with detached send button. | **Single line input** (Like WhatsApp). | **Coding/Complex Prompts.** AI prompts are often long (code snippets, essays). The box needs to grow vertically to let users review their whole prompt before sending. |

----------

## Part 3 — Proposed Layout: _“The Three-Pane Consultant”_

A hybrid layout between a chat app and a productivity tool.

1.  **Left Pane — Timeline**
    
    -   Chat history organized chronologically.
        
    -   **Visual Logic:** Uses `Lucide-react` icons (specifically `MessageSquare`) for a clean, outlined look that mimics professional IDEs rather than social media apps.
        
    -   **New Chat Action:** A subtle, tactile button with a simple `Plus` icon, styled with a slight border and hover state to feel interactive but unobtrusive.
        
    -   Collapsible on mobile.
        
2.  **Center Pane — The Conversation**
    
    -   Minimal header → (Theme Toggle, Clear Chat).
        
    -   **Code Presentation:**
        
        -   Strict usage of Monospace fonts (Fira Code/JetBrains Mono) for code blocks.
            
        -   Implementation of `react-syntax-highlighter` (VS Code Dark Plus theme) to ensure correct token coloring.
            
    -   Chat bubbles: Right = user, Left = AI (Markdown & code support).
        
    -   Bottom floating prompt card:
        
        -   Model selector pill → e.g., _Using: GPT-4 ▾_
            
        -   ⚙️ Settings toggle near Send button.
            
3.  **Right Pane — “Control Deck” (Key Differentiator)**
    
    -   Appears via ⚙️ icon → slide-in drawer.
        
    -   Controls:
        
        -   Temperature slider (with visual cue).
            
        -   Max tokens slider (with numeric input).
            
        -   System prompt box for power users.
            
        -   API status indicator (dummy OK).
            

----------

## Part 4: Visualizing the "Control Deck" (UI Detail)

Since you asked for new ideas, here is a specific feature to make your UI stand out: **"Dynamic Input Border"**.

-   **Standard State:** Input border is **Grey** (Neutral).
    
-   **High Temperature (>0.7):** Input border glows slightly **Orange/Purple** (indicating creativity, randomness, or "heat").
    
-   **Low Temperature (<0.3):** Input border glows **Blue/Green** (indicating precision, logic, or "coolness").
    

**Why?** It gives the user immediate visual feedback on the "mode" of the AI without them having to check the sliders constantly. It turns a boring setting into a functional design element.

----------

## Research Summary

> The goal is to combine the friendliness of ChatGPT, the design finesse of Claude, and the functional controls of DeepSeek — while eliminating clutter and hidden complexity.