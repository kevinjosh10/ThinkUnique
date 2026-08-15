# **App Name**: SIH TeamForge

## Core Features:

- Dynamic Problem Statements: Fetch and display problem statements from Firestore, showing title and short description.
- Registration Form: Capture team data including members, edition (Hardware/Software), and uploaded PDF presentation.
- PDF Upload and Storage: Upload the idea presentation PDF to Firebase Storage. Save team data and PDF URL in Firestore.
- Team Validation: Enforce validation rules such as team size, same college members, and software edition programming skills.
- AI-Powered Content Review Tool: Analyze the uploaded PDF presentations using generative AI. This tool will identify sections where the team has potentially not followed the instructions and will provide recommendations to ensure all specified constraints have been followed.
- Problem Selection: Link users to the registration form based on which problem statement they selected
- Instructions Display: Show rules and instructions clearly. Guide teams on presentation and member criteria.

## Style Guidelines:

- Background gradient: From deep violet (#2D1E2F) to dark reddish violet (#4E2A4F) to give a futuristic feel. Based on the requested color theme, these violets are in the correct range to evoke futuristic themes.
- Primary color: Lavender (#E6E6FA) for text and main interactive elements. This color provides a light and easily readable foreground.
- Accent color: Soft pink (#F4C2C2) for highlights and button hover states. The light reddish hue sits to the left of lavender on the color wheel, and offers contrast through both saturation and brightness.
- Headline font: 'Space Grotesk' sans-serif for headers. Body font: 'Inter' sans-serif for body text and form labels. These fonts provide a balance between modern and readable.
- Use glowing neon icons to represent different categories and actions, enhancing the futuristic theme.
- Cards with rounded corners and subtle neon glow effects to display problem statements and team information. Ensure responsive design using TailwindCSS grid and flexbox.
- Subtle animations on button hover and page transitions using Framer Motion for a smooth user experience.