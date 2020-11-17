const { age, date } = require("../../lib/utils")
const Instructor = require("../models/Instructor")
const Intl = require("intl")




module.exports = {
    index(req, res) {

        Instructor.all(function(instructors) {
            return res.render("instructors/index", { instructors })
        })
    },
    create(req, res) {
        return res.render("instructors/create")
    },
    post(req, res) {

        const keys = Object.keys(req.body)

    for(key of keys) {

        if(req.body[key] == "")
        return res.send("Fill all form")
    }

    Instructor.create(req.body, function(instructor) {
        return res.redirect(`/instructors/${instructor.id}`)
    })
      
    },
    show(req, res) {

        Instructor.find(req.params.id, function(instructor) {
            if(!instructor) return res.send("Instructor not found !!!!")

            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(",")
            instructor.created_at = date(instructor.created_at).iso

            return res.render("instructors/show", { instructor })
        })
    },
    edit(req, res) {

        Instructor.find(req.params.id, function(instructor) {
            if(!instructor) return res.send("Instructor not found !!!!")

            instructor.birth = date(instructor.birth).iso
            instructor.services = instructor.services.split(",")
            instructor.created_at = date(instructor.created_at).iso

            return res.render("instructors/edit", { instructor })
        })
    },
    put(req, res) {

        const keys = Object.keys(req.body)

        for(key of keys) {
    
            if(req.body[key] == "") {
                return res.send("Fill all form")
            }
         }

         Instructor.update(req.body, function() {
             return res.redirect(`/instructors/${req.body.id}`)
         })
    },
    delete(req, res) {

        Instructor.delete(req.body.id, function() {
        return res.redirect(`/instructors`)
        })
    },
}


/* exports.index = function(req, res) {
    return res.render("instructors/index", { instructors: data.instructors})
}

exports.create = function(req, res) {
    return res.render("instructors/create")
}

exports.post = function(req, res) {

    const keys = Object.keys(req.body)

    for(key of keys) {

        if(req.body[key] == "")
        return res.send("Fill all form")
    }

    let {avatar_url, birth, name, services, gender} = req.body;

    birth = Date.parse(birth);
    const created_at = Date.now();
    const id = Number(data.instructors.length + 1);

    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    })

    console.log(created_at);

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("File error");

        return res.redirect("/instructors");
    })

    //return res.send(req.body)
};

exports.show = function(req, res) {

    const { id } = req.params;

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id;
    })

    if(!foundInstructor) return res.send("Not found Instructors")



    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat('en-CA').format(foundInstructor.created_at),
    }

    console.log(new Intl.DateTimeFormat('en-CA').format(foundInstructor.created_at))

    console.log(instructor)


    return res.render("instructors/show", { instructor });
}

exports.edit = function(req, res) {

    const { id } = req.params;

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id;
    })

    if(!foundInstructor) return res.send("Not found Instructors")

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth).iso
    }

    return res.render("instructors/edit", { instructor })
}

exports.put = function(req, res) {

    const { id } = req.body;

    let index = 0

    const foundInstructor = data.instructors.find(function(instructor, foundIndex){
       if ( id == instructor.id) {
           index = foundIndex
           return true
       }
    })

    if(!foundInstructor) return res.send("Not found Instructors")

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Error !!!")

        return res.redirect(`/instructors/${id}`)
    })
}

exports.delete = function(req, res) {

    const { id } = req.body;

    const filteredInstructors = data.instructors.filter(function(instructor){
        return instructor.id != id 
    })

    data.instructors = filteredInstructors

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Error file !!!")

        return res.redirect("/instructors")
    })
} */