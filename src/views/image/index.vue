<template>
     <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div class="btn_box">
        <el-radio-group  v-model="reqParams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" size="small" style="float:right">添加素材</el-button>
        <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="handleSuccess"
        :headers="uploadHeaders"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      </div>
      <div class="img_list">
        <div class="img_item"  v-for="item in images" :key="item.id">
          <img src="../../assets/images/avatar.jpg" alt />
          <div class="foot" v-show="!reqParams.collect">
            <span class="el-icon-star-off selected" :class="{selected:item.is_collected}"></span>
            <span class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </el-card>
  </div>
</template>
<script>
import store from '@/store'
export default {
  data () {
  // 提交参数
    return {
      reqParams:
      {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      // store: [],
      total: 0,
      collect: null,
      imagUrl: null,
      dialogVisiible: false,
      imageUrl: null,
      // 上传组件头部信息
      uploadHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    async getImages () {
      const {
        data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    handleSuccess (res) {
    // 1.获取图片地址显示img标签
    // console.log(res) res.data.url 图片地址
      this.imagUrl = res.data.imagUrl
      // 完成预览
      // 提示上传成功
      this.$message.success('上传成功')
      // 3.过2s后关闭对话框，更新列表
      window.setTimeout(() => {
        this.dialogVisiible = false
        this.reqParams.page = 1
        this.getImages()
      }, 2000)
    },
    changecollect () {
      this.reqPaarams.page = 1
      this.getImages()
    },
    changePager (newPage) {
      this.req.Params.page = newPage
      this.getImages()
    },
    // 打开对话框
    openDialog () {
      this.imageUrl = null
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped lang='less'>
.img_list {
  margin-top: 20px;
  .img_item {
    width: 160px;
    height: 160px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin-right: 50px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .foot {
      position: absolute;
      width: 100%;
      height: 30px;
      line-height: 30px;
      left: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      text-align: center;
      span {
        margin: 0 20px;
        &.selected {
          color: red;
        }
      }
    }
  }
}
</style>
