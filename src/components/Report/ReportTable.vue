<template>
  <div class="q-pa-md">
    <div>
      <q-btn
        color="primary q-mb-md"
        icon="restart_alt"
        label="Load"
        @click="collectReports"
      />
      <q-table
        ref="myTable"
        :class="tableClass"
        tabindex="0"
        title="Test Reports"
        :data="reportTable"
        :columns="columns"
        row-key="report"
        selection="single"
        :selected.sync="selected"
        :pagination.sync="pagination"
        :filter="filter"
        @focusin.native="activateNavigation"
        @focusout.native="deactivateNavigation"
        @keydown.native="onKey"
      >
        <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </div>
    <div
      v-if="selected.length > 0"
      class="q-mt-xl"
      style="border: 5px solid #1976D2"
    >
      <h4>REPORTS</h4>
      <embed type="text/html" :src="reportUrl" width="1024" height="1024" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      navigationActive: false,
      filter: "",
      selected: [],
      pagination: {},
      columns: [
        {
          row: "desc",
          required: true,
          label: "Report Id",
          name: "report",
          align: "left",
          field: row => row.docId,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "id",
          align: "center",
          label: "ID",
          field: "id"
        },
        {
          name: "project",
          align: "center",
          label: "Project",
          field: "project",
          sortable: true
        },
        { name: "variant", label: "Variant", field: "variant", sortable: true },
        { name: "testId", label: "Test ID", field: "testId" },
        { name: "status", label: "Status", field: "status", sortable: true }
      ],
      reportUrl: ""
    };
  },
  computed: {
    ...mapGetters("reports", ["reportTable"]),
    tableClass() {
      return this.navigationActive === true ? "shadow-8 no-outline" : void 0;
    }
  },
  methods: {
    ...mapActions("reports", ["collectReports"]),
    activateNavigation() {
      this.navigationActive = true;
    },

    deactivateNavigation() {
      this.navigationActive = false;
    },

    onKey(evt) {
      if (
        this.navigationActive !== true ||
        [33, 34, 35, 36, 38, 40].indexOf(evt.keyCode) === -1 ||
        this.$refs.myTable === void 0
      ) {
        return;
      }

      evt.preventDefault();

      const { computedRowsNumber, computedRows } = this.$refs.myTable;

      if (computedRows.length === 0) {
        return;
      }

      const currentIndex =
        this.selected.length > 0 ? computedRows.indexOf(this.selected[0]) : -1;
      const currentPage = this.pagination.page;
      const rowsPerPage =
        this.pagination.rowsPerPage === 0
          ? computedRowsNumber
          : this.pagination.rowsPerPage;
      const lastIndex = computedRows.length - 1;
      const lastPage = Math.ceil(computedRowsNumber / rowsPerPage);

      let index = currentIndex;
      let page = currentPage;

      switch (evt.keyCode) {
        case 36: // Home
          page = 1;
          index = 0;
          break;
        case 35: // End
          page = lastPage;
          index = rowsPerPage - 1;
          break;
        case 33: // PageUp
          page = currentPage <= 1 ? lastPage : currentPage - 1;
          if (index < 0) {
            index = 0;
          }
          break;
        case 34: // PageDown
          page = currentPage >= lastPage ? 1 : currentPage + 1;
          if (index < 0) {
            index = rowsPerPage - 1;
          }
          break;
        case 38: // ArrowUp
          if (currentIndex <= 0) {
            page = currentPage <= 1 ? lastPage : currentPage - 1;
            index = rowsPerPage - 1;
          } else {
            index = currentIndex - 1;
          }
          break;
        case 40: // ArrowDown
          if (currentIndex >= lastIndex) {
            page = currentPage >= lastPage ? 1 : currentPage + 1;
            index = 0;
          } else {
            index = currentIndex + 1;
          }
          break;
      }

      if (page !== this.pagination.page) {
        this.pagination = {
          ...this.pagination,
          page
        };

        this.$nextTick(() => {
          const { computedRows } = this.$refs.myTable;
          this.selected = [
            computedRows[Math.min(index, computedRows.length - 1)]
          ];
        });
      } else {
        this.selected = [computedRows[index]];
      }
    }
  },
  mounted() {
    this.collectReports();
  },
  watch: {
    selected(val) {
      if (val.length) {
        this.reportUrl = val[0].url;
      }
    }
  }
};
</script>
