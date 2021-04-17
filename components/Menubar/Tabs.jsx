export default {
    name: "Tabs",
    data() {
        return {
            highlightWidth: 0,
            highlightMarginLeft: 6
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
        this.highlightMarginLeft = document.getElementById("activeTab").getBoundingClientRect().left - document.getElementById("tabs").getBoundingClientRect().left;
    },
    methods: {
        tabClick(event) {
            document.getElementById("activeTab").id = "";
            let xPos = event.currentTarget.getBoundingClientRect().left;
            let width = event.currentTarget.clientWidth;
            let parentXPos = document.getElementById("tabs").getBoundingClientRect().left;
            event.currentTarget.id = "activeTab";
            this.highlightMarginLeft = xPos - parentXPos;
            this.highlightWidth = width;
        }
    },
    computed: {
        tabHighlightStyles() {
            return {
                "width": this.highlightWidth + "px",
                "margin-left": this.highlightMarginLeft + "px"
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
