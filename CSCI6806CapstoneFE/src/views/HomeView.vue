<script setup lang="ts">
import { ref } from 'vue';
import { ElInput, ElButton } from 'element-plus';

const originalText = ref('');
const summary = ref('');
</script>

<template>
  <div class="w-full h-full">
  <section class="m-10 flex flex-col items-center justify-center">
    <div class="m-4 w-full flex justify-center">
      <el-input
        v-model="originalText"
        style="width: 80%"
        :autosize="{ minRows: 4, maxRows: 20 }"
        type="textarea"
        placeholder="Please input"
      />
    </div>
    <div class="m-4 w-full flex justify-center">
      <el-button type="primary" v-on:click="console.log(originalText)">
        Summarize
        <el-icon class="el-icon--right">
          <Upload />
        </el-icon>
      </el-button>
    </div>
    <div class="m-4 w-full flex justify-center">
      <el-input
        v-model="summary"
        style="width: 80%"
        :autosize="{ minRows: 4}"
        type="textarea"
        readonly
        placeholder="Waiting for Summary"
      />
    </div>
  </section>
</div>
</template>
