const admin = require("firebase-admin");
const db = admin.firestore();

exports.updatePassword = (req, res) => {
    const email = req.body.email;
    const newPassword = req.body.newPassword;

    if (email && newPassword) {
        // Query for the document with the specified email
        db.collection("user_information")
            .where("Email", "==", email)
            .get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    // Assuming there's only one document with the specified email
                    const doc = querySnapshot.docs[0];
                    doc.ref.update({ Password: newPassword });

                    console.log("Password updated successfully.");
                    res.status(200).json({ message: "Password updated successfully" });
                } else {
                    console.error("Document not found in Firestore for email:", email);
                    res.status(404).send("Document not found.");
                }
            })
            .catch((error) => {
                console.error("Error updating password:", error);
                res.status(500).send("Error updating password.");
            });
    } else {
        res.status(400).send("Email and newPassword are required.");
    }
};
