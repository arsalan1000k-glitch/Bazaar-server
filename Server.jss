// टर्मिनल में चलाएँ: npm install express firebase-admin cors
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();
app.use(cors());
app.use(express.json());

// ==============================================================
// 
// ==============================================================
const serviceAccount = {
  // {
  "type": "service_account",
  "project_id": "bazaar-a611c",
  "private_key_id": "cad9476a027952d7614746024ec0985ad38b9a3b",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDAg9dtXP+E2jFd\n8uXMwGFSBHCvpz3vb+rnAXArWiEHSYuyKOyjPhv3YMT0RqfEMZAzVaOeOVYZCiYc\nDLUmvDms2uqdhy/XTaVP8eXvyIvuwC4qqhdUXLVJipnGOtqf1oDwIr6SZQD2keuK\n4G+8uEL9bfzoqeGMZq+bkMraBUfE2OGk8sr/7vRukAEu15Wf++3iW32sWkEdj7Zt\nHFUHoss+7GDC6coxgRKxrXZnUVLC9X+HPQ3Lzp+sdEYQmmeyj5sPcl8lt53T0jM3\nOLe1kdKVFnKOJqQHtt/Kuf8WvcrBIgs1Ij3j/6ymnboqdoeNJx1K6ZCURH9HZXtA\nJdjvNoVzAgMBAAECggEAGTYK070ej0Ddvy5sjrRQ6mM/eJlfwIf5DLiA/oRml+Q3\nQaUfXD9pfSt0j4LjPIu7FSXtb+6VSmEsXXcCkCiNKwheOjP2fW0jLYWBtbWfMayE\nPz0YIgmkChX3DmEtuUnnh8sdBuHoTuIMJRtANsgwqayqNrPsoCzgaXB8SDHx1KLR\ny4PwfdA4wcFW78u0Sb91MZfQXctDOH6nrx55TgQagX+/Gz7mnpdFjoOZM2fppY6T\n5Ep38meOmQGBWdvxtTwoEy/CZIrqlVML+ZNq+4M4jPba8k17wuVFBrlR5ZO5Oguh\nB88/IqDKQO6AQFFNQRP1x4ixx750Uhh0o9092wb7hQKBgQD7qiFXAT7euYgmO6Aa\ngJ6HHJTC8u+8CiEu6SLIxMLEurr0Cw0LxgDoeJNxx4SYKs5t3MnbVvxK17M1hor4\nzJOdRrJzLahlgHQ6Goc9xj5TBagzmxX/hkRH9lCKlgL0/C7vxZEsFz9GIjEHezVM\nQ5qiHKXgGZfGtVimbLFHRJFOLQKBgQDD1NrZSKAcF0/AEiTwtNssbV2OfGYXBG6R\nmqtXPfTJAfiGPIXQUSpnlf8qlJS5mJQT1RBLeJRwG2YnF+oDBQJ4P49jlfILWkDl\niongseOYnEJyKOCHJLnXBVWs6TMEuciGdgQl7DFRgvw5vKVkcFV3qULy/27H6mSQ\nVL+6t40GHwKBgF2bzaToMLN1vV/DQ+03tD+7cNYGuQdvmSIy055sGapFbq7BwYuE\njefqmaVzui1Dlt8khezRMSzBiMY7EkwzBCE3H79Z105R9ml6Xp2qtJn6+7KeWBNg\npNtDknfKDrWDbA4BpdsJlp6Gr0gCGzQP3V+5WjW+L0dZQu08dsB0j7vNAoGAOJtO\np4BWx8f1RY/5HZspv63dXVKYMA8X5v7OiGlgWLo5HJRiGdVcbJTvLV/FneB87T6p\ndydjwQQqgyJmgnjwPdIhoKe3T5DHMZLaSBkjsPl6O4WVYXs8POtN2K2QEc2iKTvz\n9wJPP0CdqBLfvCi8i9phf9xWKXOXniDhSxfDrAECgYB5+US/AAPrpUEvGKbVCkfl\nBOHdJ8BeTi2kIa5THCTSR2FZp0d5FiiKOrVz+Z0oKMX4x6nBEpVv7SYi6C9GWdLJ\nHkcjuTN+jOToVT/5q4JTANe5i8eZF8bsGAsnktIxfuQdLXQnBuIizz+HpOxI0Yad\nZcppdoOeMtsGRW+eLcEgiw==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@bazaar-a611c.iam.gserviceaccount.com",
  "client_id": "114288254530218373138",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40bazaar-a611c.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
};
// ==============================================================

// Firebase Admin Initialize
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// बज़र ट्रिगर API
app.post("/trigger-buzzer", async (req, res) => {
  const { deviceToken } = req.body;

  if (!deviceToken) {
    return res.status(400).json({ error: "Device Token zaroori hai!" });
  }

  const message = {
    token: deviceToken,
    notification: {
      title: "🚨 BUZZER ALERT!",
      body: "Emergency Buzzer baj raha hai! Turant check karein."
    },
    android: {
      priority: "high",
      notification: {
        channelId: "buzzer_high_alerts",
        sound: "default",
        priority: "max",
        defaultSound: true,
        vibrateTimingsMillis: [0, 500, 200, 500, 200, 1000],
        visibility: "public"
      }
    },
    data: {
      type: "buzzer_action",
      action: "play_loud_sound"
    }
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("✅ Buzzer sent successfully:", response);
    res.json({ success: true, messageId: response });
  } catch (error) {
    console.error("❌ Send error:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Buzzer Server running on port ${PORT}`);
});
