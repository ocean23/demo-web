<template>
  <el-table :data="tableData" style="width: 100%" max-height="550">
    <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
    <el-table-column prop="province" label="省份" width="120"> </el-table-column>
    <el-table-column prop="city" label="市区" width="120"> </el-table-column>
    <el-table-column prop="area" label="区" width="600"> </el-table-column>
    <el-table-column prop="address" label="地址" width="600"> </el-table-column>
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button @click.prevent="deleteRow(scope.row)" type="text" size="small"> 移除 </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { getConsumerData } from '../../api/app';

  export default defineComponent({
    setup() {
      const tableData = ref([]);

      function loadData() {
        getConsumerData().then((res) => {
          console.log(res);
          tableData.value = res.data;
        });
      }

      function deleteRow(row: any) {
        console.log(row);
      }

      onMounted(() => {
        loadData();
      });

      return { tableData, deleteRow };
    },
  });

  // export default {
  //   methods: {
  //     deleteRow(index, rows) {
  //       rows.splice(index, 1);
  //     },
  //   },
  //   data() {
  //     return {
  //       tableData: [
  //         {
  //           date: '2016-05-03',
  //           name: '王小虎',
  //           province: '上海',
  //           city: '普陀区',
  //           address: '上海市普陀区金沙江路 1518 弄',
  //           zip: 200333,
  //         },
  //       ],
  //     };
  //   },
  // };
</script>
