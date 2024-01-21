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
router.delete('/delete_issue/:issueId', async (req, res) => {
    try {
        let email = req.session.authorization.username;
        let issueId = req.params.issueId;

        const deletedIssue = await Issue.findOneAndDelete({ _id: issueId, client_email: email });

        if (!deletedIssue) {
            return res.status(404).json({ message: 'Issue not found or unauthorized' });
        }

        return res.json({ message: 'Issue deleted successfully', deletedIssue });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// PATCH route to update an issue by ID
router.patch('/update_issue/:issueId', async (req, res) => {
    try {
        let email = req.session.authorization.username;
        let issueId = req.params.issueId;
        let { title, description, image, location } = req.body;

        const issue = await Issue.findOne({ _id: issueId, client_email: email });

        if (!issue) {
            return res.status(404).json({ message: 'Issue not found or unauthorized' });
        }

        if (title) {
            issue.title = title;
        }
        if (description) {
            issue.description = description;
        }
        if (image) {
            issue.image = image;
        }
        if (location) {
            issue.location = location;
        }

        issue.save();

        return res.json({ message: 'Issue updated successfully', issue });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

function validateIssueFields(reqBody) {
    const { title, description, image, location } = reqBody;

    if (!title || !description || !image || !location) {
        return { valid: false, message: 'Missing fields' };
    }

    if (typeof title !== 'string' || typeof description !== 'string') {
        return { valid: false, message: 'Invalid field type. title and description must be strings.' };
    }

    return { valid: true };
}

module.exports = router;