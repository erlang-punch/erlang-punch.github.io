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

// Returns CSS class for active header
function header_link(name, target) {
    var active_link = "p-1 bg-secondary text-primary";
    var passive_link = "p-1";
    var css_class = name === target ? active_link : passive_link ;
    return m(m.route.Link, {class: css_class, href: "/" + name}, name);
}

var Header = {
    view: function(vnode) {
        var name = vnode.children[0];
        var description = vnode.children[1];
        return [
            m("header", {class: "bg-gray columns"}, [
                m("div", {class: "m-2 p-2 column col-auto col-2", style: "width: 3rem; height: 3rem;"}, [
                    m("img", {class: "img-responsive img-fit-contain p-centered", src: "https://erlangpunch.com/assets/images/erlang-punch.png"}, [])
                ]),
                m("div", {class: "column col p-0"}, [
                    m(m.route.Link, {class: "p-1 text-bold", href: "/home"}, "Awesome Erlang List"),
                    m("div", {class: ""}, [
                        header_link("projects", name),
                        header_link("books", name),
                        header_link("publications", name),
                        header_link("authors", name),
                        header_link("about", name),
                    ]),
                    m("div", {class: "p-1 bg-secondary text-primary"}, description)
                ])
            ])
        ];
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
                    return m("div", {class: "py-2 tile"}, [
                        m("div", {class: "tile-content"}, [
                            m("div", {class: "d-inline-flex title-title"}, [
                                m("div", {class: ""}, [
                                    m("a", {class: "text-bold", href: item.repository}, item.name),
                                    m("span", {class: "chip text-tiny bg-primary mx-2"}, [
                                        item.stars,
                                        " \u{2B50}"
                                    ])
                                ])
                            ]),
                            m("div", {class: "px-2"}, [
                                m("div", {class: "tile-subtitle"}, item.description),
                                m("div", {class: ""}, [
                                    Number.isInteger(item.watchers) ? m("span", {class: "chip text-tiny bg-secondary"}, item.watchers + " watchers") : "",
                                    Number.isInteger(item.size) ? m("span", {class: "chip text-tiny bg-secondary"}, item.size + " kB") : "",
                                    Number.isInteger(item.open_issues) ? m("span", {class: "chip text-tiny bg-secondary"}, item.open_issues + " open issues") : "",
                                    m("span", {class: "chip text-tiny bg-secondary"}, item.forks + " forks"),
                                    m("span", item.labels.map(label => {
                                        return m("span", {class:"chip text-tiny"}, label);
                                    }))
                                ])
                            ])
                        ])
                    ])
                })
            ])
        ]}
}

var Books = {
    oninit: Api.books.fetch,
    view: function(vnode) {
        return [
            m(Header, "books", "A list of Awesome Erlang Books"),
            m("main", [
            ])
        ];
    }
}

var Publications = {
    oninit: Api.publications.fetch,
    view: function(vnode) {
        return [
            m(Header, "publications", "A list of Awesome Erlang Academic Publications"),
            m("main", [
            ])
        ];
    }
}

var Resources = {
    view: function(vnode) {
        return [
            m(Header, "resources", "A list of Awesome Erlang Resources"),
            m("main", [
            ])
        ];
    }
}

var Authors = {
    view: function(vnode) {
        return [
            m(Header, "authors", "A list of Awesome Erlang Authors"),
            m("main", [
            ])
        ];
    }
}

var About = {
    view: function(vnode) {
        return [
            m(Header, "about", "About Awesome Erlang List project..."),
            m("main", [
            ]),
        ];
    }
}

var Home = {
    view: function(vnode) {
        return [
            m(Header, "home", ""),
            m("main", [
                m("svg", {"class":"feather feather-star","xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},
                  m("polygon", {"points":"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"})
                 )
            ])
        ];
    }
}




var Application = {
    
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
