<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { ElInput, ElButton } from 'element-plus';

import { getSummarize, type GetSummerizeParams } from '@/services/getSummarize';

// const originalText: Ref<GetSummerizeParams> = ref({} as GetSummerizeParams);
const loading = ref(false);
const originalText= ref('');
const summary = ref('');
const getSummary = async () => {
  try {
    loading.value = true;
    const res = await getSummarize({
      input_string: originalText.value,
    });
    summary.value = res.summary;
    }
   catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="w-full h-full">
  <!-- <section class="back absolute top-0 z-0">
    
  </section> -->
  <div class="w-full h-full z-10 ">
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
      <el-button type="primary" v-on:click="getSummary">
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
</div>
</template>
