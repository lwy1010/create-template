<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as postApi from "@/api/posts";
import { Post } from "@/types/posts";
import { ElMessage } from "element-plus";

const tableData = ref<Post[]>([]);
const pagination = ref({ page: 1, limit: 10 });
const total = ref(0);

onMounted(() => {
  handleQueryList();
});

const handleQueryList = async () => {
  const { data } = await postApi.queryPosts(pagination.value);
  tableData.value = data.docs;
  total.value = data.totalDocs;
};

const handlePageChange = (page: number) => {
  pagination.value.page = page;
  handleQueryList();
};

const handleEdit = (post: Post) => {
  console.log(post);
  ElMessage.success({ message: "你点击了编辑" });
};

const handleDelete = (post: Post) => {
  console.log(post);
  ElMessage.success({ message: "你点击了删除" });
};
</script>

<template>
  <div class="bg-white">
    <el-table :data="tableData">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="readCount" label="阅读量"></el-table-column>
      <el-table-column prop="collectCount" label="收藏量"></el-table-column>
      <el-table-column prop="likeCount" label="点赞数"></el-table-column>
      <el-table-column prop="agreeCount" label="赞同数"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex py-4 pr-4 justify-end">
      <el-pagination
        v-model:currentPage="pagination.page"
        :page-size="pagination.limit"
        :total="total"
        background
        layout="prev,pager,next"
        hide-on-single-page
        @current-change="handlePageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
