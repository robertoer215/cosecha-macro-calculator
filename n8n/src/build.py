import json, os
SP=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def R(f):
    s = open(SP+'/src/'+f).read()
    # resolver.js lleva el motor embebido: se inyecta al construir, de una sola fuente
    if '__MOTOR__' in s:
        s = s.replace('__MOTOR__', open(SP+'/src/motor.js').read())
    return s
CAT='1mTLfnFkM6bnoODaKPCe56jcrPDwODrPyvB0ci4QgDBI'
PED='1GuJ25cpQqYdW-K9gVaX2cEF8B0jtgS0_T-kCnqL3XlU'
GS={'googleSheetsOAuth2Api':{'id':'2jLqaszHBvu2H5h8','name':'Google Sheets account'}}

def code(name, file, x, y):
    return {'id': name.lower().replace(' ','-').replace('·','').replace('á','a'), 'name': name,
            'type':'n8n-nodes-base.code','typeVersion':2,'position':[x,y],
            'parameters':{'mode':'runOnceForAllItems','jsCode': R(file)}}

def tool(name, file, desc, x, y):
    return {'id':'tool-'+name,'name':name,'type':'@n8n/n8n-nodes-langchain.toolCode','typeVersion':1.1,
            'position':[x,y],
            'parameters':{'name':name,'description':desc,'language':'javaScript','jsCode':R(file)}}

SYS = (
 'Eres el asistente de COSECHA, restaurante fast casual saludable en Angelopolis, Puebla.\n\n'
 'REGLA ABSOLUTA: NUNCA escribas un numero que no te haya devuelto una herramienta. Ni un macro,\n'
 'ni un gramaje, ni un precio, ni un total. Llama a la herramienta y copia el valor exacto, con sus\n'
 'mismos decimales. No redondees, no estimes, no sumes por tu cuenta. Una verificacion posterior\n'
 'audita cada cifra y descarta tu texto entero si encuentra una sola que no venga del calculo.\n\n'
 'Tu trabajo es SOLO explicar: por que el plato queda asi, que macro se queda corto y que propone\n'
 'el sistema para cerrarlo. Tu pones las palabras; los numeros los pone el codigo.\n\n'
 'El mensaje que recibes YA trae el resultado del calculo: tamanos, gramos, macros, precios,\n'
 'desviacion y total, todo producido por codigo determinista. Usa ESOS valores tal cual.\n'
 'NO sumes, NO restes, NO calcules porcentajes: ni siquiera un total de gramos. Si te falta una\n'
 'cifra que no este en el mensaje, pidela a una herramienta: porcionar (tamanos y desviaciones),\n'
 'armar_ticket (precios y total), calculadora (comprueba la suma) o consultar_menu (catalogo con\n'
 'filtros por categoria, alergeno y tag). Nunca la inventes ni la deduzcas.\n\n'
 'AUTORIA: si un tamano viene en tamanos_fijados_por_el_cliente, lo fijo EL CLIENTE, no el\n'
 'sistema: no digas que el sistema lo eligio ni por que. Si el_sistema_eligio_algun_tamano es\n'
 'false, el sistema no eligio nada. No menciones cuantas combinaciones se evaluaron.\n\n'
 'ORIGEN DE LA META: meta_origen dice de donde salen los macros objetivo. Si es "formula", los\n'
 'calculo la app con el perfil del cliente y puedes llamarlos "tu meta". Si es "manual_comida" o\n'
 '"manual_dia", los trajo EL CLIENTE (de su nutriologo o de su plan): por comida, o para todo el\n'
 'dia repartido en comidas_al_dia comidas. Entonces llamalos "tus macros" o "tu plan", NUNCA digas\n'
 'que la app los calculo, no los cuestiones ni sugieras cambiarlos, y no menciones peso, edad,\n'
 'actividad ni objetivo, porque no los conoces.\n\n'
 'PROPUESTA DE CIERRE: si existe, describela SOLO parafraseando propuesta_cierre.descripcion,\n'
 'que ya dice que se anade, que aporta, que otras lineas cambian de tamano y cuanto cuesta. La\n'
 'propuesta siempre ANADE un modulo; NUNCA digas "en lugar de", "reemplazar", "cambiar X por Y"\n'
 'ni "quitar": nada se quita. Si no hay propuesta y algun macro queda fuera de meta, la razon\n'
 'es EXACTAMENTE motivo_sin_propuesta; no inventes otra.\n\n'
 'ALERGENOS: los del catalogo estan derivados del nombre del plato y NO los ha verificado cocina.\n'
 'Si el usuario pide excluir alguno, dilo: no los presentes como garantia.\n\n'
 'ESTILO: espanol de MEXICO. Tutea de tu: "tienes", "quieres", "puedes". NUNCA vos ni voseo\n'
 '("tenes", "queres", "podes") y nunca el vosotros de Espana. DOS frases, ni una mas.\n'
 'Sin emojis, sin listas, sin markdown.\n'
 'Se breve: esta respuesta se muestra al cliente mientras espera. Si un macro\n'
 'queda fuera de meta dilo sin rodeos, y presenta la propuesta de cierre como una opcion que el\n'
 'cliente decide, no como algo ya anadido. Devuelve solo el texto, sin prefijos ni comillas.'
)

AGENT_TEXT = ('={{ JSON.stringify({ objetivo: $json.meta, restricciones_sin: $json.sin, '
              'lineas: $json.lineas.map(l => ({ id: l.id, nombre: l.nombre, tamano: l.tamano, g: l.g, precio: l.precio })), '
              'macros_totales: $json.macros_totales, desviacion: $json.desviacion, '
              'dentro_de_umbral: $json.dentro_de_umbral, total_mxn: $json.total, '
              'meta_origen: $json.meta_origen, comidas_al_dia: $json.comidas, '
              'tamanos_fijados_por_el_cliente: $json.seleccion.filter(s => s.tamano != null).map(s => s.id + "=" + s.tamano), '
              'el_sistema_eligio_algun_tamano: $json.combinaciones_evaluadas > 1, '
              'propuesta_cierre: $json.propuesta_cierre, motivo_sin_propuesta: $json.motivo_sin_propuesta, '
              'modulos_rechazados: $json.rechazados, umbral_g: 4 }) }}')

# Una fila por llamada en la hoja de Pedidos, columnas A..AB en este orden:
#   timestamp, pedido_id, kcal/prot/carb/gras objetivo, restricciones, seleccion,
#   tamanos, lineas, g_totales, kcal/prot/carb/gras total, desv prot/carb/gras,
#   dentro_de_umbral, coincide_con_la_app, propuesta_cierre, upsell_aceptado,
#   total_mxn, explicacion, ms, pedido_id_previo, meta_origen, comidas.
# meta_origen y comidas (AA, AB; cabecera escrita el 19-sep-2026 con un flujo
# temporal): de dónde salió la meta (formula | manual_comida | manual_dia).
# upsell_aceptado y pedido_id_previo vienen del cuerpo (Validar entrada): la app
# repite la llamada al aceptar la propuesta, con el flag en true y el id del
# pedido al que responde. Antes se escribía `false` fijo.
REG = ("={{ JSON.stringify({ values: [[ new Date().toISOString(), $json.pedido_id, "
  "$('Resolver plato').first().json.meta.kcal, $('Resolver plato').first().json.meta.prot, "
  "$('Resolver plato').first().json.meta.carb, $('Resolver plato').first().json.meta.gras, "
  "($('Resolver plato').first().json.sin||[]).join('|'), $json.lineas.map(l=>l.id).join('|'), "
  "$json.lineas.map(l=>l.tamano).join('|'), $json.lineas.length, $json.lineas.reduce((a,l)=>a+l.g,0), "
  "$json.macros_totales.kcal, $json.macros_totales.prot, $json.macros_totales.carb, $json.macros_totales.gras, "
  "$json.desviacion.prot, $json.desviacion.carb, $json.desviacion.gras, $json.dentro_de_umbral, "
  "$json.coincide_con_la_app, $json.propuesta_cierre ? $json.propuesta_cierre.id : '', "
  "$('Resolver plato').first().json.upsell_aceptado === true, "
  "$json.total, $json.explicacion, $json.auditoria.ms, "
  "$('Resolver plato').first().json.pedido_id_previo || '', "
  "$('Resolver plato').first().json.meta_origen || 'formula', $('Resolver plato').first().json.comidas ?? '' ]] }) }}")

nodes = []
nodes.append({'id':'wh','name':'Webhook · plato','type':'n8n-nodes-base.webhook','typeVersion':2.1,
  'position':[-680,300],'webhookId':'cosecha-modo-ia',
  'parameters':{'httpMethod':'POST','path':'cosecha-plato','responseMode':'responseNode','options':{}}})
nodes.append(code('Validar entrada','validar.js',-460,300))
nodes.append({'id':'leercat','name':'Leer catálogo','type':'n8n-nodes-base.httpRequest','typeVersion':4.2,
  'position':[-240,300],
  'parameters':{'url':'https://sheets.googleapis.com/v4/spreadsheets/'+CAT+'/values/A1:Q30',
    'authentication':'predefinedCredentialType','nodeCredentialType':'googleSheetsOAuth2Api',
    'options':{'timeout':8000}},
  'credentials':GS})
nodes.append(code('Resolver plato','resolver.js',-20,300))
nodes.append({'id':'siok','name':'¿Entrada válida?','type':'n8n-nodes-base.if','typeVersion':2.2,
  'position':[200,300],
  'parameters':{'conditions':{'options':{'caseSensitive':True,'typeValidation':'loose','version':2},
    'conditions':[{'id':'c1','leftValue':'={{ $json.abortar }}','rightValue':'',
      'operator':{'type':'boolean','operation':'false','singleValue':True}}],
    'combinator':'and'}}})
nodes.append({'id':'agente','name':'Agente · explicar','type':'@n8n/n8n-nodes-langchain.agent',
  'typeVersion':3.1,'position':[420,300],
  'parameters':{'promptType':'define','text':AGENT_TEXT,
    'options':{'systemMessage':SYS,'maxIterations':4}}})
nodes.append({'id':'llm','name':'Claude Haiku 4.5','type':'@n8n/n8n-nodes-langchain.lmChatAnthropic',
  'typeVersion':1.5,'position':[340,540],
  'parameters':{'model':{'__rl':True,'value':'claude-haiku-4-5-20251001','mode':'list','cachedResultName':'Claude Haiku 4.5'},
    'options':{'maxTokensToSample':220}},
  'credentials':{'anthropicApi':{'id':'iJPvF7ebMo2uWM6V','name':'Anthropic account'}}})
nodes.append(tool('consultar_menu','tool_consultar_menu.js',
  'Catalogo del dia de COSECHA con filtros duros. Entrada JSON opcional: {"categoria":"proteina|carbohidrato|vegetal|grasa","sin":["lacteos"],"tag":"vegano","id":"C01"}. Devuelve los modulos con sus gramajes, macros y precios EXACTOS por tamano. Usala para cualquier dato del menu: nunca cites un macro o un precio de memoria.',
  500,540))
nodes.append(tool('porcionar','tool_porcionar.js',
  'Devuelve los tamanos que el porcionado resolvio para el plato actual, los gramos y el precio de cada linea, los macros totales y la desviacion frente a la meta. No necesita entrada. Llamala SIEMPRE antes de responder: es la fuente de todo tamano y toda desviacion.',
  660,540))
nodes.append(tool('calculadora','tool_calculadora.js',
  'Suma de nuevo las lineas del plato desde cero y las compara con los totales que se van a responder. No necesita entrada. Devuelve cuadra true o false. Llamala SIEMPRE antes de cerrar.',
  820,540))
nodes.append(tool('armar_ticket','tool_armar_ticket.js',
  'Devuelve el ticket: cada linea con nombre, tamano, gramos y precio en MXN, el total a pagar y la propuesta de cierre con su precio extra. No necesita entrada. Usala para cualquier cifra de dinero.',
  980,540))
nodes.append(code('Verificar y armar','verificar.js',700,300))
nodes.append({'id':'registrar','name':'Registrar en Sheets','type':'n8n-nodes-base.httpRequest',
  'typeVersion':4.2,'position':[920,300],
  'parameters':{'method':'POST',
    'url':'https://sheets.googleapis.com/v4/spreadsheets/'+PED+'/values/A1:AB1:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS',
    'authentication':'predefinedCredentialType','nodeCredentialType':'googleSheetsOAuth2Api',
    'sendBody':True,'specifyBody':'json','jsonBody':REG,'options':{'timeout':8000}},
  'credentials':GS,'onError':'continueRegularOutput'})
nodes.append({'id':'responder','name':'Responder JSON','type':'n8n-nodes-base.respondToWebhook',
  'typeVersion':1.1,'position':[1140,300],
  'parameters':{'respondWith':'json',
    'responseBody':"={{ JSON.stringify($json) }}",'options':{}}})
nodes.append({'id':'rechazo','name':'Responder error','type':'n8n-nodes-base.respondToWebhook',
  'typeVersion':1.1,'position':[420,120],
  'parameters':{'respondWith':'json',
    'responseBody':"={{ JSON.stringify({ ok:false, errores: $json.errores, rechazados: $json.rechazados || [] }) }}",
    'options':{'responseCode':400}}})

conn = {
 'Webhook · plato':{'main':[[{'node':'Validar entrada','type':'main','index':0}]]},
 'Validar entrada':{'main':[[{'node':'Leer catálogo','type':'main','index':0}]]},
 'Leer catálogo':{'main':[[{'node':'Resolver plato','type':'main','index':0}]]},
 'Resolver plato':{'main':[[{'node':'¿Entrada válida?','type':'main','index':0}]]},
 '¿Entrada válida?':{'main':[[{'node':'Agente · explicar','type':'main','index':0}],
                             [{'node':'Responder error','type':'main','index':0}]]},
 'Agente · explicar':{'main':[[{'node':'Verificar y armar','type':'main','index':0}]]},
 # Responder va PRIMERO en el array: el registro en Sheets tardaba ~1 s y no
 # tiene por qué estar en el camino crítico de la respuesta al cliente.
 'Verificar y armar':{'main':[[{'node':'Responder JSON','type':'main','index':0},
                               {'node':'Registrar en Sheets','type':'main','index':0}]]},
 'Claude Haiku 4.5':{'ai_languageModel':[[{'node':'Agente · explicar','type':'ai_languageModel','index':0}]]},
}
for t in ['consultar_menu','porcionar','calculadora','armar_ticket']:
    conn[t] = {'ai_tool':[[{'node':'Agente · explicar','type':'ai_tool','index':0}]]}

wf = {'name':'COSECHA · Modo IA — porcionado y ticket','nodes':nodes,'connections':conn,
      'settings':{'executionOrder':'v1'}}
open(SP+'/workflow.json','w').write(json.dumps(wf, ensure_ascii=False))
print('nodos:', len(nodes), '| bytes:', len(json.dumps(wf)))
