<template>
  <div class="home">
    <input type="text" />
    <input type="text" />
    <button @click="dowload">下载</button>
  </div>
</template>

<script>
import Excel from 'exceljs/dist/exceljs.min.js'
export default {
  methods: {
    dowload() {
      const workbook = new Excel.Workbook()
      workbook.created = new Date()
      workbook.modified = new Date()
      const sheet = workbook.addWorksheet('测试导出表')
      sheet.properties.defaultRowHeight = 25

      sheet.columns = [
        { header: '编号', key: 'id', width: 25 },
        { header: '姓名', key: 'name', width: 30 },
        { header: '年龄', key: 'age', width: 30 },
        { header: '性别', key: 'gender', width: 30 },
      ]
      sheet.addRow({ id: 1, name: '小明', age: 26, gender: '男' })
      sheet.addRow({ id: 2, name: '小红', age: 27, gender: '女' })
      sheet.addRow({ id: 3, name: '小话', age: 25, gender: '男' })

      workbook.xlsx
        .writeBuffer()
        .then((buffer) => {
          // buffer --> blob
          const blob = new Blob([buffer], { type: 'application/vnd.ms-excel' })
          let link = document.createElement('a')
          link.download = 'download.xlsx'
          link.target = 'blank'
          // blob --> url
          link.href = URL.createObjectURL(blob)
          link.click()
        })
        .catch((err) => {
          throw err
        })
    },
  },
}
</script>
