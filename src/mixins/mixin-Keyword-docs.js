import { scroll } from "quasar";
const { getScrollTarget, setScrollPosition } = scroll;

export default {
  props: ["setScroll"],
  emits: ["scrollSection"],
  components: {
    "keyword-title": () =>
      import("src/components/Documentation/keywordTitle.vue"),
    "keyword-info": () => import("src/components/Documentation/keywordInfo.vue")
  },
  methods: {
    scrollToElement(id) {
      console.log(id);
      const el = document.getElementById(id);
      const target = getScrollTarget(el);
      const offset = el.offsetTop;
      const duration = 500;
      setScrollPosition(target, offset, duration);
    }
  },
  watch: {
    setScroll(val) {
      if (val) this.scrollToElement(val);
    }
  },
  mounted() {
    setTimeout(() => {
      const elList = document.querySelectorAll(".scrollLink");
      const scrollSections = Array.from(elList).map(el => el.id);
      this.$emit("getScrollSections", scrollSections);
    }, 250);
    const redirectURL = this.$route.query.redirect;
    if (redirectURL) this.scrollToElement(redirectURL);
  }
};
