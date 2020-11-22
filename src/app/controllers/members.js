const { age, date } = require("../../lib/utils");
const Member = require("../models/Member");
const Intl = require("intl");

module.exports = {
  index(req, res) {
    let { filter, page, limit } = req.query;

    page = page || 1;
    limit = limit || 4;
    let offset = limit * (page - 1);

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(members) {
        const pagination = {
          filter,
          total: Math.ceil(members[0].total / limit),
          page,
        };

        return res.render("members/index", { members, pagination, filter });
      },
    };

    Member.paginate(params);
  },
  create(req, res) {
    Member.instructorsSelectOptions(function (options) {
      return res.render("members/create", { instructorOptions: options });
    });
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") return res.send("Fill all form");
    }

    Member.create(req.body, function (member) {
      return res.redirect(`/members/${member.id}`);
    });
  },
  show(req, res) {
    Member.find(req.params.id, function (member) {
      if (!member) return res.send("Member not found !!!!");

      member.birth = date(member.birth).birthDay;

      return res.render("members/show", { member });
    });
  },
  edit(req, res) {
    Member.find(req.params.id, function (member) {
      if (!member) return res.send("Member not found !!!!");

      member.birth = date(member.birth).iso;

      Member.instructorsSelectOptions(function (options) {
        return res.render("members/edit", {
          member,
          instructorOptions: options,
        });
      });
    });
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Fill all form");
      }
    }

    Member.update(req.body, function () {
      return res.redirect(`/members/${req.body.id}`);
    });
  },
  delete(req, res) {
    Member.delete(req.body.id, function () {
      return res.redirect(`/members`);
    });
  },
};

/* exports.index = function(req, res) {
    return res.render("members/index", { members: data.members})
}

exports.create = function(req, res) {
    return res.render("members/create")
}

exports.post = function(req, res) {

    const keys = Object.keys(req.body)

    for(key of keys) {

        if(req.body[key] == "")
        return res.send("Fill all form")
    }

    birth = Date.parse(req.body.birth);

    let id = 1;
    const lastMember = data.members[data.members.length - 1]

    if(lastMember) {
        id = lastMember.id + 1;
    }

    data.members.push({
        id,
        ...req.body,
        birth
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("File error");

        return res.redirect(`/members/${id}`);
    })
};

exports.show = function(req, res) {

    const { id } = req.params;

    const foundMember = data.members.find(function(member){
        return member.id == id;
    })

    if(!foundMember) return res.send("Not found Members")

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthDay
    }

    return res.render("members/show", { member });
}

exports.edit = function(req, res) {

    const { id } = req.params;

    const foundMember = data.members.find(function(member){
        return member.id == id;
    })

    if(!foundMember) return res.send("Not found Members")

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso
    }

    return res.render("members/edit", { member })
}

exports.put = function(req, res) {

    const { id } = req.body;

    let index = 0

    const foundMember = data.members.find(function(member, foundIndex){
       if ( id == member.id) {
           index = foundIndex
           return true
       }
    })

    if(!foundMember) return res.send("Not found Members")

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Error !!!")

        return res.redirect(`/members/${id}`)
    })
}

exports.delete = function(req, res) {

    const { id } = req.body;

    const filteredMembers = data.members.filter(function(member){
        return member.id != id 
    })

    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Error file !!!")

        return res.redirect("/members")
    })
} */
