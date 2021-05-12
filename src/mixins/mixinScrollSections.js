import { scroll } from "quasar";
import { mapState, mapActions } from "vuex";
const { getScrollTarget, setScrollPosition } = scroll;

export default {
  computed: {
    ...mapState("scroll", ["currentScrollPosition"])
  },
  methods: {
    ...mapActions("scroll", ["setScrollSections"]),
    scrollToElement(id) {
      const el = document.getElementById(id);
      const target = getScrollTarget(el);
      const offset = el.offsetTop;
      const duration = 0;
      setScrollPosition(target, offset, duration);
    }
  },
  watch: {
    currentScrollPosition(val) {
      if (val) this.scrollToElement(val);
    }
  },
  activated() {
    setTimeout(() => {
      const elList = document.querySelectorAll(".scrollLink");
      const scrollSections = Array.from(elList).map(el => el.id);
      this.setScrollSections(scrollSections);
      const redirectURL = this.$route.query.redirect;
      if (redirectURL) this.scrollToElement(redirectURL);
    }, 250);
  },
  mounted() {
    setTimeout(() => {
      const elList = document.querySelectorAll(".scrollLink");
      const scrollSections = Array.from(elList).map(el => el.id);
      this.setScrollSections(scrollSections);
      const redirectURL = this.$route.query.redirect;
      if (redirectURL) this.scrollToElement(redirectURL);
    }, 250);
  }
};
