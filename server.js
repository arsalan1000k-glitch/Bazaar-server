const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();
app.use(cors());
app.use(express.json());

// Firebase Service Account Credentials
const serviceAccount = {
  "type": "service_account",
  "project_id": "bazaar-a611c",
  "private_key_id": "0df2cccbddcc53964a5666762cbcbb3650198b5c",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCkCyoVrVqSHUUu\nqfoe79TfFjq4RIEpwd9uZbyMScfbj0FhOgvshEkBB7c4zLCPjPKeapYNhJ7g+rso\njthk1rGi9gAUwGimlKvTZg8AaiU4lxGVGkFCBPfzQ9JWXt2Z1gHATQIgRj/8/R9P\nfZAThcCs1CSg88N4jrSbW2bugVrIUFjtPnz5c0awp7Kb9GqmrHX+Bj61hLqI8CJu\nsG6CAQ/kK2zVPb3Tk5MxSKOAGsLZVNSbkG89dH9+qL8znQ/rUvPKD+ZcbMZemTQ2\ngL08rKTFMi055TwCDrB7TjQL5QLQzQ/FuNIa23Rb3zH/H3y6xtEuPzhWGbBStwrI\ncvJTLRcjAgMBAAECggEASiHTeG1ZRzucBo0A/9cRI2mnypsGpci7wGeQb/Ntsn6I\nJLh3KADV/vWuKqhxx8WB5O409lHu/KvCRX9cMiHFr+esvLQA9vqrtcJi2CSfwnWe\nl/t/7yZQqOoG1UpUqY8JRo5mfhBRHXKEIkeTgwcIPfI2xVezh7kxzB1fpDvnuyq+\n5dRdR8vHen24QEjhRHx+IdEwbK9UNQNf+xnEorgK6K+TyWwqg0D76uPwVxw/46p+\nvZCDUCn5yn+AGdp2gFsHIR6zPqUGnQpCOWT+iYGRDdDGejiqBR5EVcg7jLqjNrik\nJxR2avJIPZEt7FjP3L2TiJ0Brwl9oB96F1IYhiXqXQKBgQDSOucuPlUJPAN0sEpI\n+b6w4xPqbYscyMHjVOmOHrzVMgTBc5FlTBYqzHnbkLKyZ+1cAD4r4mlk5n7ZMUeu\n2suRj4LgfKjpvZd5h3UmoeuF6gjioB+pokBL2Cy1Gmf+qfId3ZJHwGT6WeZ7GaDc\np0E+OJemHRMCfiIUCmbawuMqlQKBgQDHwhMq0rTlNECAwS7vVcIBVTHQ6c6Wka0X\nJiyd3ojea8k79U9s2gIbPFfHhjBOpQw5LGflNbeBZmcm8V14lgPoJ6pjIARDyKlT\nlUoBiHM+UPuFEUwkIxSxnDBzfrE9CKIjh3bH+MFqv5IBE9zH3iAC0ViHiMbhv6MS\nssG8HlIE1wKBgQDNuR5pPk3wj23CTpEjAGH+rvfaPAAZ1ssFLx6uGJ4o8p18wR7S\nxbYbg6Trm5mCw/ieQw6T2yfPuU8AMx02mp0CgDFOhC63LPSB1HBrsZ/Ml8zCGHdj\nhIbusUhuoLyLlLp9R0nSNQ+bfUXxyI6F3pYV0UN1JpZnpg6rFdK42GV8UQKBgEzp\nI1ockHujV6Z7Ouf5e93pgGmwa9M7OYqtLwaFlOsWUv+b3r3JXoBABogS2WyeTYuB\n1mrA+OuAkvzCd7ui/tQW2ZqazCmRC+jblQfsEnsO0RiV5VwQibosqdb+E52tQkgt\nswUheM7x/XQewqXNl0OeeNiOSAzJLS9Y1hDpF6k3AoGBAK5nCSGaxY6gUmvIyY68\njwCJgS1xBtVyEoB2xcw0mEg15KI8urIEaZYl0h5HP4VpSo3P9+n1/im3s8xmLViw\nvy1TyvVIVQXtAnG832e8u9O2UipW65GIEe9PXSb2lri2PNi1/q0BVw9fy/2esPf5\njw7m2oA2Ck1ou42HYbc5Eb5u\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@bazaar-a611c.iam.gserviceaccount.com",
  "client_id": "114288254530218373138",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40bazaar-a611c.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

// Firebase Admin Initialize
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Buzzer Trigger API
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
      
