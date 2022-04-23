<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as artileApi from "@/api/article";
import { Article, QueryForm } from "@/types/article";
import { ElMessage } from "element-plus";
import { Search } from "@element-plus/icons-vue";

const tableData = ref<Article[]>([]);
const queryForm = ref<QueryForm>({ title: "", isHot: undefined });
const pagination = ref({ page: 1, limit: 10 });
const total = ref(0);

onMounted(() => {
  handleListQuery();
});

const handleListQuery = async () => {
  const { data } = await artileApi.queryArticles({ ...pagination.value, ...queryForm.value });
  tableData.value = data.docs;
  total.value = data.totalDocs;
};

const handlePageChange = (page: number) => {
  pagination.value.page = page;
  handleListQuery();
};

const handleDelete = async (article: Article) => {
  await artileApi.deleteArticle(article.id);
  await handleListQuery();
  ElMessage.success({ message: "删除成功" });
};
</script>

<template>
  <el-form class="flex justify-end" :model="queryForm">
    <el-form-item class="mr-3 w-36">
      <el-select
        v-model="queryForm.isHot"
        placeholder="文章状态"
        clearable
        @change="handleListQuery"
      >
        <el-option label="热门" :value="true"></el-option>
        <el-option label="非热门" :value="false"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="w-64">
      <el-input
        @input="handleListQuery"
        v-model="queryForm.title"
        placeholder="文章标题"
        :suffix-icon="Search"
      ></el-input>
    </el-form-item>
  </el-form>

  <el-card shadow="none" :body-style="{ padding: '0px' }">
    <el-table :data="tableData" stripe>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="readCount" label="阅读量"></el-table-column>
      <el-table-column prop="collectCount" label="收藏量"></el-table-column>
      <el-table-column prop="likeCount" label="点赞数"></el-table-column>
      <el-table-column prop="agreeCount" label="赞同数"></el-table-column>
      <el-table-column prop="isHot" label="是否热门">
        <template #default="{ row }">{{ row.isHot ? "是" : "否" }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-popconfirm title="确定删除吗?" @confirm="handleDelete(row)">
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="flex my-4 mr-4 justify-end"
      v-model:currentPage="pagination.page"
      :page-size="pagination.limit"
      :total="total"
      background
      layout="total,prev,pager,next"
      hide-on-single-page
      @current-change="handlePageChange"
    >
    </el-pagination>
  </el-card>
</template>
