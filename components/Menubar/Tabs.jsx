import style from "./Tabs.css?module";

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
        this.highlightWidth = document.getElementById(style.activeTab).clientWidth;
        this.highlightMarginLeft = document.getElementById(style.activeTab).getBoundingClientRect().left - document.getElementById(style.tabs).getBoundingClientRect().left;
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
                <div id={style.tabHighlight} style={this.tabHighlightStyles}></div>
                <div id={style.tabs}>
                    {this.tabs.map((tab) => (
                        <NuxtLink to={tab.link} class={style.tab} id={(tab.active ? style.activeTab : "")}>
                            {tab.title}
                        </NuxtLink>
                    ))}
                </div>
            </div>
        );
    }
};
