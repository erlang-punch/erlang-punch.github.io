//
//
//
var Api = {
    projects: {
        list: [],
        fetch: function() {
            m.request({
                method: "GET",
                url: "/api/projects.json"
            })
            .then(function(data) {
                Api.projects.list = data
            })
        }
    },
    books: {
        list: [],
        fetch: function() {
            m.request({
                method: "GET",
                url: "/api/books.json"
            })
            .then(function(data) {
                Api.projects.list = data
            })
        }
    },
    publications: {
        list: [],
        fetch: function() {
            m.request({
                method: "GET",
                url: "/api/publications.json"
            })
            .then(function(data) {
                Api.projects.list = data
            })
        }
    }    
}

function active_link(a,b) {
    return a === b ? "m-1 p-1 bg-secondary text-primary" : "m-1 p-1";
}

var Header = {
    view: function(vnode) {
        var name = vnode.children[0];
        var description = vnode.children[1];
        return [
            m("header", {class: "bg-gray"}, [
                m("div", {class: ""}, [
                    m(m.route.Link, {class: "", href: "/projects"}, "Awesome Erlang List"),
                    m(m.route.Link, {class: active_link("projects", name), href: "/projects"}, "projects"),
                    m(m.route.Link, {class: active_link("books", name), href: "/books"}, "books"),
                    m(m.route.Link, {class: active_link("publications", name), href: "/publications"}, "publications"),
                    m(m.route.Link, {class: active_link("authors", name), href: "/authors"}, "authors"),
                    m(m.route.Link, {class: active_link("about", name), href: "/about"}, "about")
                ]),
                m("p", {class: "px-2 bg-secondary text-primary"}, description)
            ])
        ];
    }
}

var Footer = {
    view: function(vnode) {
        return m("footer", {class: "bg-gray"}, [
            m("hr"),
            m("p", {class: "text-center text-tiny"}, [
                "Made by ",
                m("a", {href: "https://erlangpunch.com"}, "Erlang Punch"),
                " with <3"
            ])
        ]);
    }
}

var Projects = {
    oninit: Api.projects.fetch,
    view: function(vnode) {
        return [
            m(Header, "projects", [
                "A list of",
                " (", Api.projects.list.length, ") ",
                "Awesome Erlang Open-source Projects",
            ]),
            m("main", [
                Api.projects.list.map(function(item) {
                    return m("div", {class: "py-2"}, [
                        m("div", {class: "d-inline-flex"}, [
                            m("div", {class: ""}, [m("a", {href: item.repository}, item.name), ":"]),
                            m("div", {class: "px-1"}, item.description)
                        ]),
                        m("div", [
                            m("span", {class: "chip text-tiny"}, item.stars + " stars"),
                            Number.isInteger(item.watchers) ? m("span", {class: "chip text-tiny"}, item.watchers + " watchers") : "",
                            Number.isInteger(item.size) ? m("span", {class: "chip text-tiny"}, item.size + " kB") : "",
                            Number.isInteger(item.open_issues) ? m("span", {class: "chip text-tiny"}, item.open_issues + " open issues") : "",
                            m("span", {class: "chip text-tiny"}, item.forks + " forks"),
                            m("span", item.labels.map(label => {
                                return m("span", {class:"chip text-tiny"}, label);
                            }))
                        ])
                    ])
                })
            ]),
            m(Footer)
        ]}
}

var Books = {
    oninit: Api.books.fetch,
    view: function(vnode) {
        return [
            m(Header, "books", "A list of Awesome Erlang Books"),
            m("main", [
            ]),
            m(Footer)
        ];
    }
}

var Publications = {
    oninit: Api.publications.fetch,
    view: function(vnode) {
        return [
            m(Header, "publications", "A list of Awesome Erlang Academic Publications"),
            m("main", [
            ]),
            m(Footer)
        ];
    }
}

var Resources = {
    view: function(vnode) {
        return [
            m(Header, "resources", "A list of Awesome Erlang Resources"),
            m("main", [
            ]),
            m(Footer)
        ];
    }
}

var Authors = {
    view: function(vnode) {
        return [
            m(Header, "authors", "A list of Awesome Erlang Authors"),
            m("main", [
            ]),
            m(Footer)
        ];
    }
}

var About = {
    view: function(vnode) {
        return [
            m(Header, "about", "About Awesome Erlang List project..."),
            m("main", [
            ]),
            m(Footer)
        ];
    }
}

var root = document.getElementById("application");
m.route(root, "/", {
    "/": Projects,
    "/projects": Projects,
    "/books": Books,
    "/publications": Publications,
    "/resources": Resources,
    "/authors": Authors,
    "/about": About
});
