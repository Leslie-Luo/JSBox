const file_path = "demo.json";
function read() {
    exists();
    let file = $file.read(file_path)
    return JSON.parse(file.string)
}

function write(data) {
    let success = $file.write({
        data: $data({
            string: JSON.stringify(data)
        }),
        path: file_path
    })
    if (!success) {
        $ui.toast("写入数据失败");
    }else{
        $ui.toast("数据保存成功");
    }
}

function exists() {
    let exists = $file.exists(file_path)
    if (!exists) {
        let data = {
            "Push-up": []
        };
        write(data)
    } 
}


module.exports = {
    read: read,
    write: write
}