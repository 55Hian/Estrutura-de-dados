var buscarOpcoes = Class.create();
buscarOpcoes.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    pegarOpcao: function () {
        var opcoes = []
        var opcoesArr = [];
        var parm = this.getParameter('sysparm_view');
        
        // 1. Create an object to store rows from a table
        var opcoesLista = new GlideRecord("question_choice");

        // 2. Build query
        buscarOpcoes.addQuery("value", "=", "INP1070_receita_total");
        buscarOpcoes.addQuery("value", "=", "INP1070_receita_de_antecipação");
        buscarOpcoes.addQuery("value", "=", "INP1070_indice_de_penetração_de_antecipação");
        buscarOpcoes.addQuery("value", "=", "INP1070_adesão");
        buscarOpcoes.addQuery("value", "=", "INP1070_tarifa_operacional");
        buscarOpcoes.addQuery("value", "=", "INP1070_outros");

        // 3. Execute query
        buscarOpcoes.query();

        // 4. Process returned records
        while (buscarOpcoes.next()) {
            
            if(parm == 'portal'){
                opcoes.push(buscarOpcoes.text.toString());
			}
			else if(parm == 'native'){
				var obj = {};
				obj.name = buscarOpcoes.text.toString();
				obj.sys_id = buscarOpcoes.toString();
				opcoesArr.push(obj); 	           
        //Logic you want to execute.
        //Use myObj.field_name to reference record fields
        }

    }

        if(parm == 'portal')
            return opcoes.toString();
        else
            return JSON.stringify(opcoesArr);

    },

    type: "buscarOpcoes",

});
