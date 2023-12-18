const admin = require("firebase-admin");
const db = admin.firestore();

const searchData = async (req, res) => {
    const searchTerm = req.query.email;
    console.log("Search term:", searchTerm);

    if (searchTerm !== undefined) {
        console.log("Searching Firestore for:", searchTerm);

        const collectionRef = db.collection("admin_information");

        collectionRef
            .where("Email", "==", searchTerm)
            .get()
            .then((querySnapshot) => {

                const results = [];
                querySnapshot.forEach((doc) => {
                    results.push(doc.data());
                });
                console.log("Search results:", results);

                res.json(results);
            })
            .catch((error) => {
                console.error("Error searching Firestore:", error);
                res.status(500).send("Error searching Firestore");
            });
    } else {

        console.log("Search term is undefined");
        res.status(400).send("Search term is undefined");
    }
};
module.exports = { searchData };

  
