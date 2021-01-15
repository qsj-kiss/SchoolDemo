/**
 基于Jquery datatables 的扩展方法
 适用于JQuery Ui 1.10.x 以上版本
 @author James,25708164@qq.com;
 @date  2016-11-22
 */

    //查询参数设置
var searchParams = function (d, searchParasCreater, containerId) {
        var arr = [];
        if (containerId != undefined) {
            // ary = $("#"+containerId).parent().parent().parent().find(".searchPara");
            ary = $("#" + containerId).closest(".ui-tabs-panel").find(".searchPara");
        } else {
            ary = $(".searchPara");
        }

        if (ary.length > 0) {
            for (var i = 0; i < ary.length; i++) {
                d[ary[i].id] = ary[i].value;
            }
        }

        if (typeof (searchParasCreater) == 'function') {
            sp = searchParasCreater();
            for (key in sp) {
                d[key] = sp[key];
            }
        }
        return d;
    };

/**
 * containerId：容器ID
 * arrayColumns：显示列
 * arrayVisibleColumns：隐藏列
 * ajaxUrl：远程数据地址
 * langUrl：个性语言地址
 * formatRow：createdRow 回调方法，用于改变列的显示效果，如果没有可以不传
 * completeCallback：完成后的回调方法，可不传
 */
//创建Table，适用于单选的Table
function createTable(containerId, arrayColumns, arrayVisibleColumns, ajaxUrl, langUrl, formatRow, completeCallback, searchParasCreater) {
    try {
        if ($('#' + containerId).length > 0) {
            $('#' + containerId).dataTable({
                //实现表格单元鼠标浮动展示所有内容

                "aoColumnDefs": [
                    {
                        "aTargets": "_all",
                        "fnCreatedCell": function (td, cellData, rowData, row, col) {
                            if (cellData != null && cellData != undefined && !(cellData instanceof Object)) {
                                $(td).attr("title", $(td).text())//wutao 2019-03-05修改 表格单元鼠标浮动展示所有内容
                                //  if(!Number(cellData)){/wutao 2019-03-07修改 显示规则去掉对数字的限制
                                // 	$(td).attr("title",cellData)
                                //  }
                            }
                        }
                    }
                ],
                //实现表格列冻结
                /*"fixedColumns":   {
                   leftColumns: 1,
                   rightColumns: 1,
                },
                "scrollX":        true,
                "scrollCollapse": true,
                "pagingType": 'full_numbers',
                "autoWith":true,*/
                //表格固定10条数据高度，分页条不跟随数据多少高度变化，避免“”“操作列有"更多"下拉菜单被遮盖 modified by huangxiong 2019年5月24日15点42分
                // "scrollY":"350px",
                "processing": true,
                "bInfo": true,													//页脚信息
                "bLengthChange": false, 								//改变每页显示数据数量
                "bPaginate": true,											// 分页按钮
                "searching": false,
                "ordering": false,
                "pageLength": 10,											//服务器分页，每页10条
                "serverSide": true,  											//启动服务器分页
                "columns": arrayColumns,
//			        "columnDefs":arrayVisibleColumns,
                "language": {
                    "url": langUrl
                },
                "ajax": {
                    url: ajaxUrl,
                    "data": function (d) {
                        searchParams(d, searchParasCreater, containerId);
                        return d;
                    },
                    type: "post",
                    dataSrc: "data"
                },
                "initComplete": function () { //datatable对象初始化调用  reload不会触发
                    try {
                        this.on('click', 'tr', function () {
                            if ($(this).hasClass('selected')) {
                                $(this).removeClass('selected');
                            } else {
                                $('#' + containerId).DataTable().$('tr.selected').removeClass('selected');
                                $(this).addClass('selected');
                            }
                        });
                    } catch (e) {
                        console.error(e);
                        return false;
                    }
                },
                "drawCallback": function () { //每一次绘制table时候调用
                    try {
                        if (completeCallback && typeof (completeCallback) == "function") {
                            completeCallback();
                        }
                    } catch (e) {
                        console.error(e);
                        return false;
                    }
                },
                "createdRow": function (row, data, index) {										//格式化行，可执行外部的format程序
                    try {
                        if (formatRow && typeof (formatRow) == "function") {
                            formatRow(row, data, index);
                        }
                    } catch (e) {
                        console.error(e);
                        return false;
                    }
                },
            }).on('xhr.dt', function (e, settings, result, xhr) {
                if (result.returnCode) {
                    if ((result.returnCode).toLowerCase() == 'fail') {
                        alert('错误：' + result.msg);
                    }
                    return;
                }
            });
        } else {
            alert(container + " is not exist!");
        }
    } catch (e) {
        console.error(e);
    }
}

//创建多选datatable
function createMutlTable(containerId, arrayColumns, arrayVisibleColumns, ajaxUrl, langUrl, completeCallback, formatRow) {
    if ($('#' + containerId).length > 0) {
        $('#' + containerId).dataTable({
            //实现表格单元鼠标浮动展示所有内容
            "aoColumnDefs": [
                {
                    "aTargets": "_all",
                    "fnCreatedCell": function (td, cellData, rowData, row, col) {
                        if (cellData != null && cellData != undefined && !(cellData instanceof Object)) {
                            $(td).attr("title", $(td).text())//wutao 2019-03-05修改 表格单元鼠标浮动展示所有内容
                            //  if(!Number(cellData)){/wutao 2019-03-07修改 显示规则去掉对数字的限制
                            // 	$(td).attr("title",cellData)
                            //  }
                        }
                    }
                }
            ],
            /*
            scrollX:        true,
            scrollCollapse: true,*/

            "processing": true,
            "bInfo": true,													//页脚信息
            "bLengthChange": false, 								//改变每页显示数据数量
            "bPaginate": true,											// 分页按钮
            "searching": false,
            "ordering": false,
            "pageLength": 10,											//服务器分页，每页10条
            "serverSide": true,  											//启动服务器分页
            "columns": arrayColumns,
            "columnDefs": arrayVisibleColumns,
            "dom": 'T<"clear">lfrtip',
            "tableTools": {
                "sSwfPath": "/static/plugins/datatables/copy_csv_xls_pdf.swf",
                "aButtons": [
                    {
                        "sExtends": "xls",
                        "sButtonText": "导出"
                    },
                ]
            },

            "language": {
                "url": langUrl
            },
            "ajax": {
                url: ajaxUrl,
                "data": function (d) {
                    var ary = $(".searchPara");
                    if (ary.length > 0) {
                        for (var i = 0; i < ary.length; i++) {
                            d[ary[i].id] = ary[i].value;
                        }
                    }
                },
                type: "post",
                dataSrc: "data"
            },
            "initComplete": function () {
                try {
                    if (completeCallback && typeof (completeCallback) == "function") {
                        completeCallback();
                    }
                } catch (e) {
                    return false;
                }
            },
            "drawCallback": function () { //每一次绘制table时候调用
                try {
                    if (completeCallback && typeof (completeCallback) == "function") {
                        completeCallback();
                    }
                } catch (e) {
                    console.error(e);
                    return false;
                }
            },
            "createdRow": function (row, data, index) {										//格式化行，可执行外部的format程序
                try {
                    if (formatRow && typeof (formatRow) == "function") {
                        formatRow(row, data, index);
                    }
                } catch (e) {
                    return false;
                }
            },
        }).on('xhr.dt', function (e, settings, result, xhr) {
            if (result.returnCode) {
                if ((result.returnCode).toLowerCase() == 'fail') {
                    alert('错误：' + result.msg);
                }
                return;
            }
        });
    } else {
        alert(container + " is not exist!");
    }
}


//创建不带ToolBar 多选datatable
function createMutlTableNoToolbar(containerId, arrayColumns, arrayVisibleColumns, ajaxUrl, langUrl, completeCallback, formatRow) {
    if ($('#' + containerId).length > 0) {
        $('#' + containerId).dataTable({
            /*fixedColumns:   {
               leftColumns: 1,
            },
            scrollX:        true,
            scrollCollapse: true,*/
            //实现表格单元鼠标浮动展示所有内容
            "aoColumnDefs": [
                {
                    "aTargets": "_all",
                    "fnCreatedCell": function (td, cellData, rowData, row, col) {
                        if (cellData != null && cellData != undefined && !(cellData instanceof Object)) {
                            $(td).attr("title", $(td).text())//wutao 2019-03-05修改 表格单元鼠标浮动展示所有内容
                            //  if(!Number(cellData)){/wutao 2019-03-07修改 显示规则去掉对数字的限制
                            // 	$(td).attr("title",cellData)
                            //  }
                        }
                    }
                }
            ],
            /*
            scrollX:        true,
            scrollCollapse: true,*/

            pagingType: 'full_numbers',
            "processing": true,
            "bInfo": true,													//页脚信息
            "bLengthChange": false, 								//改变每页显示数据数量
            "bPaginate": true,											// 分页按钮
            "searching": false,
            "ordering": false,
            "pageLength": 10,											//服务器分页，每页10条
            "serverSide": true,  											//启动服务器分页
            "columns": arrayColumns,
            "columnDefs": arrayVisibleColumns,
            "language": {
                "url": langUrl
            },
            "ajax": {
                url: ajaxUrl,
                "data": function (d) {
                    var ary = $(".searchPara");
                    if (ary.length > 0) {
                        for (var i = 0; i < ary.length; i++) {
                            d[ary[i].id] = ary[i].value;
                        }
                    }
                },
                type: "post",
                dataSrc: "data"
            },
            "initComplete": function () {
                try {
                    if (completeCallback && typeof (completeCallback) == "function") {
                        completeCallback();
                    }
                } catch (e) {
                    return false;
                }
            },
            "drawCallback": function () { //每一次绘制table时候调用
                try {
                    if (completeCallback && typeof (completeCallback) == "function") {
                        completeCallback();
                    }
                } catch (e) {
                    console.error(e);
                    return false;
                }
            },
            "createdRow": function (row, data, index) {										//格式化行，可执行外部的format程序
                try {
                    if (formatRow && typeof (formatRow) == "function") {
                        formatRow(row, data, index);
                    }
                } catch (e) {
                    return false;
                }
            },
        }).on('xhr.dt', function (e, settings, result, xhr) {
            if (result.returnCode) {
                if ((result.returnCode).toLowerCase() == 'fail') {
                    alert('错误：' + result.msg);
                }
                return;
            }
        });
    } else {
        alert(container + " is not exist!");
    }
}
