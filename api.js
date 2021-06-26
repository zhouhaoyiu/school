import global '../../global'

export default class sc {
    constructor(){
        this.GLOBAL = global
    }
    getList(){
        let options = {
            url: '/games/upload',
            method: 'post',
            data: {}
        }
        let res = await this.GLOBAL.request('class', options)
        this.GlOBAL.errorHandle(res, 'gib game')
        return res
    }
}