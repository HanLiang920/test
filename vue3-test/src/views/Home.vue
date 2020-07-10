<template>
  <div class="home">
    <input type="number" placeholder="年" v-model.number="year" min="2000" />
    <input
      type="number"
      placeholder="月"
      v-model.number="month"
      min="1"
      max="12"
    />
    <button @click="dowload">下载</button>
  </div>
</template>

<script>
import Excel from "exceljs/dist/exceljs.min.js";
export default {
  data() {
    var date = new Date();
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1
    };
  },
  methods: {
    dowload() {
      const border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" }
      };
      const { year, month } = this;
      const day = new Date(year, month, 0).getDate();
      const workbook = new Excel.Workbook();
      workbook.created = new Date();
      workbook.modified = new Date();
      const sheet = workbook.addWorksheet(`${year}年${month}月`);
      for (let i = 1; i <= 7; i++) {
        sheet.getColumn(i).width = i === 1 ? 8.13 : 12.5;
      }
      sheet.getColumn(1);
      sheet.mergeCells(1, 1, 1, 7);
      const row = sheet.getRow(1);
      row.height = 22;
      const title = row.getCell(1);
      title.value = `${year}年${month}月课表`;
      title.font = { bold: true };
      title.alignment = { vertical: "middle", horizontal: "center" };
      title.border = border;
      const timeRow = sheet.getRow(2);
      timeRow.height = 22;
      timeRow.values = [
        "",
        "第一档",
        "第二档",
        "第三档",
        "第四档",
        "第五档",
        "第六档"
      ];
      this.rowSetStyle(timeRow, false);
      for (let i = 1; i <= day; i++) {
        const row = sheet.getRow(i + 2);
        row.height = 22;
        row.values = [i];
        this.rowSetStyle(row, this.isWeekEnd(`${year}-${month}-${i}`));
      }

      workbook.xlsx
        .writeBuffer()
        .then(buffer => {
          // buffer --> blob
          const blob = new Blob([buffer], { type: "application/vnd.ms-excel" });
          let link = document.createElement("a");
          link.download = `${year}年${month}月课表.xlsx`;
          link.target = "_self";
          // blob --> url
          link.href = URL.createObjectURL(blob);
          link.click();
        })
        .catch(err => {
          throw err;
        });
    },
    rowSetStyle(row, isColor) {
      for (let i = 1; i <= 7; i++) {
        const cell = row.getCell(i);
        cell.alignment = { vertical: "middle", horizontal: "center" };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" }
        };
        if (isColor) {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFA6A6A6" }
          };
        }
      }
    },
    isWeekEnd(dateStr) {
      const date = new Date(dateStr);
      const num = date.getDay(date);
      if (num === 0 || num === 6) return true;
      return false;
    }
  }
};
</script>
