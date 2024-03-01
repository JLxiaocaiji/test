<template>
   <div >
        <!-- <img :src=picUrl /> -->
        <canvas id="canvas" ref="canvas"></canvas>
   </div>
</template>


<script>
import picUrl from '@/assets/图片位置.png'

export default {
    name: 'DrawingPaper',
    data () {
       return {
            picUrl: picUrl,

            img: {
                imgX: null,
                imgY: null,
                // 当前放大倍数
                imgScale: 0.5,
                // 图片移动后位置
                posX: null,
                posY: null,
            },
       };
    },

    mounted() {
        this.fillImage()
    },

    components: {},

    methods: {
        fillImage() {
            let canvas = this.$refs.canvas
            let ctx = canvas.getContext("2d")
            const img = new Image()
            img.src = this.picUrl

            img.onload = () => {
                canvas.width = img.width
                canvas.height = img.height
                ctx.drawImage(img, 0, 0, img.width, img.height )
            }
            img.onerror = () => {
                console.error('图片加载失败, 请刷新');
            };

            console.log(canvas.width)
            console.log(canvas.height)

            console.log(ctx.width)
            console.log(ctx.height)

            
            // const pos = canvas.getBoundingClientRect();
            // console.log(pos)

            // this.mousePos(canvas)
            this.mouseHandle(canvas)

            /* 
            从原图像坐标 (33,71) 处截取一个宽度为 104 高度为 124 的图像,
            ,并将其绘制到画布的 (21, 20) 坐标处，并将其缩放为宽 87、高 104 的图像
            drawImage(image, 33, 71, 104, 124, 21, 20, 87, 104)
            */
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, this.img.imgX, this.img.imgY)
        },

        // 鼠标位置
        mousePos(obj) {
            obj.addEventListener('mousedown', (e) => {
                console.log(e)
            })
        },

        // 鼠标相对于 canvas 容器的位置
        posToCanvas( obj, x, y ){
            let { left, top, width, height } = obj.getBoundingClientRect()
            console.log( obj )
            console.log( obj.width )
            console.log( obj.height )
            return {
                x: x - left - (width -  obj.width ) /2 ,
                y: y - top - (height - obj.height ) / 2,
            }
        }, 

        // 

        // 滚轮缩放事件
        mouseHandle( obj ) {
            obj.addEventListener('wheel', (e) => {
                let { clientX, clientY, deltaY } = e
                console.log(clientX, clientY, deltaY)
                let pos = this.posToCanvas(obj, clientX, clientY )

                console.log(pos)

                // 图片位置
                let newPos = {
                    x: Number(((pos.x - this.img.imgX)*this.img.imgScale).toFixed(2)),
                    y: Number(((pos.y - this.img.imgY)*this.img.imgScale).toFixed(2)),
                }

                console.log(newPos)

                // 放大还是缩小
                if ( deltaY > 0) {
                    this.img.imgScale += 0.2;
                } else {
                    this.img.imgScale -= 0.2
                }

                // 根据缩放比例，重新计算图片位置
                this.img.imgX = ( 1 - this.img.imgScale)* newPos.x + (pos.x - newPos.x)
                this.img.imgY = ( 1 - this.img.imgScale)* newPos.y + (pos.y - newPos.y)
                console.log(this.img)
                
            })
        }
    }
}
</script>


<style lang='scss' scoped>
canvas {
    cursor: crosshair;
    border: 1px solid;
    background-image: blue;
}
</style>