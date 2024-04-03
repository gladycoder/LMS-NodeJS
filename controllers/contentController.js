const content = require('../models/content');
const Course = require('../models/course');

// create new content
const createContent = async (req,res)=>{
    try{
        var courseid = req.params.courseId;
        var chapterId = req.params.chapterId;
        
        // const course = await Course.findOne({ _id: courseid });
        
        // var newContent = {
        //     contentType:req.body.contentType,
        //     source: req.body.source,
        // }
        // const contentData = new content(newContent); // create document
        // await Course.findOneAndUpdate(
        //     { _id: courseid, 'chapter._id': chapterId }, // Find the course by _id and chapter by _id
        //     { $push: { 'chapter.$.contentIds': contentData._id } }, // Push the contentId into the chapter's contentIds array
        //     { new: true } // Return the updated document
        //   )

        //    // Populate the contentIds field in the chapter object
        // await courseid.populate('chapter.contentIds').execPopulate();
        
        // const savedContentData = await contentData.save(); // save the document

        // res.status(200).json(savedContentData);

        // Check if the course and chapter exist
        const course = await Course.findOne({ _id: courseid, 'chapter._id': chapterId });
        if (!course) {
            return res.status(404).json({ error: 'Course or Chapter not found' });
        }

        // Create a new content document
        const newContent = new content({
            contentType: req.body.contentType,
            source: req.body.source,
        });

        // Save the new content document
        const savedContentData = await newContent.save();

        // Update the course document to push the newly created content id into the chapter's contentIds array
        await Course.findOneAndUpdate(
            { _id: courseid, 'chapter._id': chapterId },
            { $push: { 'chapter.$.contentIds': savedContentData._id } },
            { new: true }
        );

        // Retrieve the updated course document with populated chapter contentIds
        const updatedCourse = await Course.findOne({ _id: courseid }).populate('chapter.contentIds');

        res.status(200).json(savedContentData);

    }
    catch(e){
        console.log(e.message);
    }

}

const updateContent = async (req, res) => {
    try {
        
        var courseid = req.params.courseId;
        var chapterId = req.params.chapterId;
        const contentId = req.body._id; // Assuming you have the contentId in the request parameters

        // Find the content document by its ID
        const existingContent = await content.findById(contentId);

        if (!existingContent) {
            return res.status(404).json({ error: 'Content not found' });
        }

        // Update the existing content document with the new values
        existingContent.contentType = req.body.contentType;
        existingContent.source = req.body.source;

        // Save the updated content document
        const updatedContent = await existingContent.save();

        res.status(200).json(updatedContent);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const deleteContent = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const chapterId = req.params.chapterId;
        const contentId = req.body._id;
        console.log("Delete Content : "+ req.body);
        
        // Check if the course and chapter exist
        const course = await Course.findOne({ _id: courseId, 'chapter._id': chapterId });
        if (!course) {
            return res.status(404).json({ error: 'Course or Chapter not found' });
        }

        console.log("course : "+ course);

        // Remove the contentId from the chapter's contentIds array
        const chapter = course.chapter.find(chapter => chapter._id.toString() === chapterId);
        if (!chapter) {
            return res.status(404).json({ error: 'Chapter not found' });
        }

        console.log("Chapter : "+ chapter);


        const contentIndex = chapter.contentIds.indexOf(contentId);
        if (contentIndex === -1) {
            return res.status(404).json({ error: 'Content not found in chapter' });
        }
        chapter.contentIds.splice(contentIndex, 1);

        console.log("course : "+ contentIndex);

        // Save the updated course document
        await course.save();

        // Delete the content document
        await content.findByIdAndDelete(contentId);

        res.status(200).json({ message: 'Content deleted successfully' });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}



const getAllContents = async(req,res) =>{
    try{
        const courseID = req.params.courseID;
        const chapterID = req.params.chapterID;
        // console.log(chapterID);
        const course = await Course.findById(courseID);
       
        const chapter = course.chapter.find(chapter => chapter._id.toString() === chapterID);
        if (!chapter) {
            console.error('Chapter not found');
            return res.status(404).json({ error: 'Chapter not found' });
        }

        const courses = await Course.findById(courseID).populate('chapter.contentIds');
        console.log(courses);

// Accessing the populated field (chapterIds)
const chapterIds = courses.chapter.forEach(element => {
    if(element._id == chapterID){
        // console.log(element.contentIds);
        res.status(200).json(element.contentIds);
    }
});

    }
    catch(e){
        console.log(e.message);
    }
    }

module.exports ={
    createContent,getAllContents,updateContent,deleteContent
}