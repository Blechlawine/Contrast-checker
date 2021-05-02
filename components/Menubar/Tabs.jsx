var prevHighlightMarginLeft = 0;
var prevHighlightWidth = 0;

export default {
    name: "Tabs",
    data() {
        return {
            highlightWidth: prevHighlightWidth,
            highlightMarginLeft: prevHighlightMarginLeft,
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
        prevHighlightMarginLeft = this.highlightMarginLeft;
        prevHighlightWidth = this.highlightWidth;
    },
    methods: {

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
                        <NuxtLink to={tab.link} class="tab" id={(tab.active ? "activeTab" : "")}>
                            {tab.title}
                        </NuxtLink>
                    ))}
                </div>
            </div>
        );
    }
};
