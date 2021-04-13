export default {
    name: "Tabs",
    data() {
        return {
            highlightWidth: 0
        };
    },
    props: {
        tabs: {
            type: Array,
            required: true
        }
    },
    mounted() {
        this.highlightWidth = document.getElementById("activeTab").clientWidth;
    },
    methods: {
        tabClick(event) {
            document.getElementById("activeTab").id = "";
            let xPos = event.currentTarget.getBoundingClientRect().left;
            let width = event.currentTarget.clientWidth;
            let parentXPos = document.getElementById("tabs").getBoundingClientRect().left;
            event.currentTarget.id = "activeTab";
            document.getElementById("tabHighlight").style.marginLeft = xPos - parentXPos + "px";
            document.getElementById("tabHighlight").style.width = width + "px";
        }
    },
    computed: {
        tabHighlightStyles() {
            return {
                "width": this.highlightWidth + "px"
            };
        }
    },
    render(h) {
        return (
            <div id="tabsWrapper">
                <div id="tabHighlight" style={this.tabHighlightStyles}></div>
                <div id="tabs">
                    {this.tabs.map((tab) => (
                        <div class="tab" id={(tab.active ? "activeTab" : "")} onClick={this.tabClick}>{tab.title}</div>
                    ))}
                </div>
            </div>
        );
    }
};
