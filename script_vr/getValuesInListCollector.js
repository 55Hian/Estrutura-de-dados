(function execute(inputs, outputs) {

    outputs.sysidstring =  findParams(inputs.pElement, inputs.pTable, inputs.pParam, inputs.pLabel);

    function findParams(element, table_name, paramType, parameterValue){

        var queryString = '';
        var table = '^name=' + table_name;
        var parameter = ''

        if (paramType == 'sys_id') parameter ='^labelIN' + parameterValue; //find SysID based in name of choice value

        else if (paramType == 'name') parameter = '^sys_idIN' + parameterValue; // find name of choice based in SysID

        // else parameter = ''

        // adionar else pra retornar valores 
       
        var grSysChoice = new GlideRecord('sys_choice');
        grSysChoice.addEncodedQuery("element=" + element + table + "^inactive=false" + parameter);
        grSysChoice.orderBy('sys_created_on');
        grSysChoice.setLimit(50);
        grSysChoice.query();

        while (grSysChoice.next()) {
            if (paramType == 'sys_id') queryString += grSysChoice.sys_id.toString() + ','; //add SysID

            else if (paramType == 'name') queryString += grSysChoice.getValue('value') + ','; // add value of choice

            // else queryString += grSysChoice
        }

        return queryString; // return query

    }


})(inputs, outputs);