<h1>AstroGuide: Discover Your Cosmic Journey</h1>
<p>Unlock the secrets of the universe with AI-powered astrological insights tailored just for you.</p>
<h2>Features</h2>
<ul>
    <li>
        <h3>Generate Your Kundali</h3>
        <p>
            Create a detailed birth chart (Kundali) by inputting your exact birth details, such as date, time, and location.
            Our AI-powered algorithms use astrological calculations to provide insights into planetary positions, houses, and their impact on your life.
        </p>
        <h4>Technology Stack:</h4>
        <ul>
            <li><b>DataStax Astra DB</b>: Stores user birth data and planetary information with scalability and low-latency access.</li>
            <li><b>Astrology API</b>: Computes planetary positions, houses, and aspects.</li>
            <li><b>Python FastAPI</b>: Backend API for performing astrological calculations.</li>
        </ul>
    </li>
    <li>
        <h3>AI Recommendations</h3>
        <p>
            Our advanced AI engine analyzes your Kundali and provides personalized recommendations, including gemstone suggestions, rituals, and remedies to enhance positive influences and mitigate challenges.
        </p>
        <h4>Technology Stack:</h4>
        <ul>
            <li><b>OpenAI GPT APIs</b>: Generates natural language insights and personalized suggestions.</li>
            <li><b>DataStax Astra DB</b>: Stores gemstone and ritual information.</li>
            <li><b>Node.js</b>: Manages APIs that fetch and recommend remedies based on astrological data.</li>
        </ul>
    </li>
    <li>
        <h3>Spiritual Guidance</h3>
        <p>
            Access curated meditation practices, affirmations, and spiritual content that align with your birth chart and current planetary transits.
        </p>
        <h4>Technology Stack:</h4>
        <ul>
            <li><b>DataStax Astra DB</b>: Manages and retrieves spiritual content aligned with user profiles.</li>
            <li><b>React.js</b>: Dynamic and responsive frontend interface to display personalized content.</li>
            <li><b>AWS Lambda</b>: Executes logic to match spiritual content with astrological influences in real time.</li>
        </ul>
    </li>
    <li>
        <h3>Today's Cosmic Insights</h3>
        <p>
            Stay updated with daily astrological forecasts, highlighting the influence of key planetary transits. Understand how the Sun, Moon, and Mercury impact creativity, emotions, and communication for the day.
        </p>
        <h4>Technology Stack:</h4>
        <ul>
            <li><b>DataStax Astra DB</b>: Stores and updates daily planetary transit data.</li>
            <li><b>Astrology API</b>: Fetches live planetary transit updates.</li>
            <li><b>GraphQL</b>: Delivers real-time insights to the frontend efficiently.</li>
        </ul>
    </li>
    <li>
        <h3>AI-Powered Insights</h3>
        <p>
            Our AI chatbot simplifies complex astrological images and interpretations into easy-to-understand summaries. This feature ensures users can grasp the key takeaways without needing deep astrological knowledge.
        </p>
        <h4>Technology Stack:</h4>
        <ul>
            <li><b>DataStax Astra DB</b>: Stores user interactions and historical chatbot conversations.</li>
            <li><b>OpenAI GPT APIs</b>: Summarizes complex astrological visuals and charts.</li>
            <li><b>Express.js</b>: Facilitates API communication for seamless chatbot interactions.</li>
        </ul>
    </li>
</ul>
<h2>Why DataStax Astra DB?</h2>
<p>
    We leverage <b>DataStax Astra DB</b>, a serverless Cassandra-as-a-Service database, to ensure:
</p>
<ul>
    <li>Scalable and low-latency storage for astrological data such as birth details, planetary positions, and user profiles.</li>
    <li>Highly available and distributed infrastructure to support real-time astrology insights.</li>
    <li>Seamless integration with GraphQL and REST APIs for efficient data retrieval.</li>
    <li>Embedding models and Integeration with LLM </li>
  ![image](https://github.com/user-attachments/assets/244798a0-1d4e-4c3a-8610-ad48530a3aa7)
![image](https://github.com/user-attachments/assets/5dbcd963-9499-47fb-9616-21e289234751)
</ul>
<h2>Getting Started</h2>
<ol>
    <li>Visit the AstroGuide platform.</li>
    <li>Enter your birth details to generate your Kundali.</li>
    <li>Explore personalized insights, recommendations, and spiritual guidance tailored to your astrological profile.</li>
</ol>
<h2>Technologies Used</h2>
<ul>
    <li><b>Frontend:</b> React.js, Tailwind CSS</li>
    <li><b>Backend:</b> FastAPI, Node.js, Express.js</li>
    <li><b>Database:</b> DataStax Astra DB</li>
    <li><b>APIs:</b> OpenAI GPT APIs, Astrology API</li>
    <li><b>Cloud:</b> AWS Lambda</li>
    <li><b>Other:</b> GraphQL</li>
</ul><br>
## TypeScript Interfaces

Below are the TypeScript interfaces used in the project:

### `Message` Interface
```typescript
/**
 * Interface for representing a message in the chat.
 */
interface Message {
  id: number; // Unique identifier for the message
  text: string; // The content of the message
  sender: 'user' | 'bot'; // Indicates whether the message is sent by the user or the bot
  timestamp: Date; // Timestamp of when the message was sent
}
/**
 * Interface for capturing Kundali (birth chart) data.
 */
interface KundaliData {
  personName: string; // Name of the person for whom the Kundali is generated
  birthYear: number; // Year of birth
  birthMonth: number; // Month of birth (1-12)
  birthDate: number; // Day of birth
  birthHour: number; // Hour of birth (0-23)
  birthMinutes: number; // Minutes of birth (0-59)
  birthSeconds: number; // Seconds of birth (0-59)
  timeZone: number; // Timezone offset from UTC
  sex: string; // Gender of the person ('male', 'female', or other options)
  city: string; // City of birth
  state: string; // State of birth
  country: string; // Country of birth
  latitude: number; // Latitude of the birth location
  longitude: number; // Longitude of the birth location
  ayanamsa: string; // Ayanamsa system used for calculations
}
**/

