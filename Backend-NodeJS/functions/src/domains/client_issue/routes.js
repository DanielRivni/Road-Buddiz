const express = require("express");
const { db } = require('../../config/firebase.js');
const router = express.Router();

// POST route to create a new issue
router.post('/new_issue', async (req, res) => {
    try {
        // Get the client's doc id for identifying the client
        const username = req.session.authorization.username;
        const clientsRef = db.collection('clients');
        const usernameQuery = await clientsRef.where('email', '==', username).get();
        const client_doc = usernameQuery.docs[0].id;

        // Validate the body fields
        const { title, description, image, location } = req.body;
        const validationResult = validateIssueFields(req.body);
        if (!validationResult.valid) {
            return res.status(400).json({ message: validationResult.message });
        }

        const issuesRef = db.collection('issues');

        await issuesRef.doc().set({
            title: title,
            description: description,
            client_doc: client_doc,
            volunteer_doc: null,
            status: 'Open',
            image: image,
            location: location
        });

        return res.status(201).json({ message: 'Issue created successfully', newIssue });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// DELETE route to delete an issue by ID
router.delete('/delete_issue', async (req, res) => {
    try {
        // Get the client's doc id for identifying the client
        const username = req.session.authorization.username;
        const clientsRef = db.collection('clients');
        const usernameQuery = await clientsRef.where('email', '==', username).get();
        const client_doc = usernameQuery.docs[0].id;

        // Find and delete the issue based on the client's doc id
        const issuesRef = db.collection('issues');
        const issueQuery = await issuesRef.where('client_doc', '==', client_doc).get();
        if (issueQuery.empty) {
            return res.status(404).json({ message: 'Issue not found or unauthorized' });
        }

        const deletedIssue = querySnapshot.docs[0].data();
        await querySnapshot.docs[0].ref.delete();

        return res.json({ message: 'Issue deleted successfully', deletedIssue });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// PATCH route to update an issue by ID
router.patch('/update_issue', async (req, res) => {

    const { title, description, image, location } = req.body;

    try {
        const username = req.session.authorization.username;
        const clientsRef = db.collection('clients');
        const usernameQuery = await clientsRef.where('email', '==', username).get();
        const client_doc = usernameQuery.docs[0].id;

        const validationResult = validateIssueFields(req.body, true);
        if (!validationResult.valid) {
            return res.status(400).json({ message: validationResult.message });
        }

        const issuesRef = db.collection('issues');
        const issueQuery = await issuesRef.where('client_doc', '==', client_doc).get();
        if (issueQuery.empty) {
            return res.status(404).json({ message: 'Issue not found or unauthorized' });
        }

        // update issue information
        const issue = issueQuery.docs[0];
        const issueRef = issuesRef.doc(issue.id);
        const updatedIssue = {
            ...(title && { title: title }),
            ...(description && { description: description }),
            ...(image && { image: image }),
            ...(location && { location: location }),
        };
        await issueRef.update(updatedIssue);

        return res.json({ message: 'Issue updated successfully', issue });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

function validateIssueFields(reqBody, isUpdate = false) {
    const { title, description, image, location } = reqBody;

    if (!isUpdate && (!title || !description || !image || !location)) {
        return { valid: false, message: 'Missing fields' };
    }

    if (typeof title !== 'string' || typeof description !== 'string') {
        return { valid: false, message: 'Invalid field type. title and description must be strings.' };
    }

    return { valid: true };
}

module.exports = router;