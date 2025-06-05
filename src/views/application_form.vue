<template>

    <div v-if="loading" class="position-fixed start-0 w-100 h-100 d-flex justify-content-center align-items-center" style="background: rgba(0, 0, 0, 0.5); z-index: 1050; top: 0px;">
        <div class="spinner-border text-light" role="status">
            <span class="visually-hidden"></span>
        </div>
    </div>

    <div class="container" v-if="thinking">
        <h1 class="titulo-principal">Formulario de Aplicación para Arrendamiento</h1>

        <form @submit.prevent="validarFormulario" class="formulario">
            <div class="seccion">
                <h2 class="titulo-seccion">📌 Información de la Propiedad</h2>
                <div class="contenedor-campos" style=" gap: 10px !important;">
                    <div class="grupo-campos">
                        <div class="campo" style="margin-bottom: 10px;">
                            <label class="etiqueta">Propiedad de interés</label>
                            <input v-model="formData.property_id" type="text" class="entrada" disabled required placeholder="Propiedad de interés">
                            <!-- <select v-model="formData.property_id" class="entrada" required>
                                <option v-for="propiedad in propiedades" :key="propiedad.id" :value="propiedad.id">
                                    {{ propiedad.direccion }}
                                </option>
                            </select> -->
                            <!-- <p class="ayuda" >Seleccione la propiedad que desea arrendar</p> -->
                        </div>
                        <div class="campo">
                            <label class="etiqueta">Fecha deseada de mudanza</label>
                            <input type="date" v-model="formData.move_in_date" class="entrada" :min="today" required>
                            <p class="ayuda"  style="margin-bottom: 0;">Fecha aproximada en que planea ocupar la propiedad</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="seccion" v-for="(responsable, index) in formData.FinancialResponsible" :key="index">

                <div class="encabezado-seccion row"  style="display: flex; flex-direction: row; justify-content: flex-start; align-content: center;">
                        <h2 class="titulo-seccion" v-if="index == 0" style="padding-left: 18px;">👤 Aplicante principal</h2>
                        <h2 class="titulo-seccion" v-if="index > 0" style="padding-left: 18px; width: auto;">👤 Co-solicitante #{{ index }}</h2>
                        <button v-if="index > 0" type="button" class="boton-eliminar" style="margin-bottom: 24px !important; height: 28px !important; width: 28px !important; margin-left: 10px; display: flex; flex-direction: column; align-content: center; justify-content: center;" @click="eliminarResponsable(index)">
                            <div style="font-size: 20px; margin-top: -2px; margin-left: -3px;">x</div>
                        </button>
                </div>


                <div class="contenedor-campos">
                    <div class="grupo-campos">
                        <h3 class="subtitulo">Información Personal</h3>
                        <div class="campos-grid">
                            <div class="campo">
                                <label class="etiqueta">Nombre completo</label>
                                <input v-model="responsable.full_name" type="text" class="entrada" required placeholder="Nombre completo">
                            </div>

                            <div class="campo">
                                <label class="etiqueta">Correo electrónico</label>
                                <input v-model="responsable.email" type="email" class="entrada" required placeholder="Correo electrónico">
                            </div>

                            <div class="campo">
                                <label class="etiqueta">Numero de telefono</label>
                                <input v-model="responsable.phone_number" type="number" class="entrada" required placeholder="Numero de telefono">
                            </div>

                            <div class="campo">
                                <label class="etiqueta">Tipo de documento</label>
                                <select v-model="responsable.document_type" class="entrada" required>
                                    <option value="" disabled selected>Seleccione un tipo de documento</option>
                                    <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
                                    <option value="Pasaporte">Pasaporte</option>
                                    <option value="Cédula de Extranjería">Cédula de Extranjería</option>
                                    <option value="Permiso por Protección Temporal">Permiso por Protección Temporal</option>
                                </select>
                            </div>

                            <div class="campo">
                                <label class="etiqueta">Número de documento</label>
                                <input v-model="responsable.document_number" type="text" class="entrada" required placeholder="Número de documento">
                            </div>

                            <div class="campo">
                                <label class="etiqueta">Fecha de nacimiento</label>
                                <input v-model="responsable.birthdate" type="date" class="entrada" :max="today" required placeholder="Fecha de nacimiento">
                            </div>

                            <div class="campo">
                                <label class="etiqueta">Nacionalidad</label>
                                <input v-model="responsable.nationality" type="text" class="entrada" required placeholder="Nacionalidad">
                            </div>
                        </div>
                    </div>

                    <div class="grupo-campos">
                        <h3 class="subtitulo">Situación Laboral</h3>
                        <div class="campos-grid">
                            <div class="campo">
                                <label class="etiqueta">Tipo de empleo</label>
                                <select v-model="responsable.employment_status" class="entrada" required>
                                    <option value="" disabled selected>Seleccione un tipo de empleo</option>
                                    <option value="Empleado - Termino Fijo">Empleado - Termino Fijo</option>
                                    <option value="Empleado - Termino Indefinido">Empleado - Termino Indefinido</option>
                                    <option value="Empleado - Prestacion de Servicios">Empleado - Prestacion de Servicios</option>
                                    <option value="Independiente">Independiente</option>
                                    <option value="Pensionado">Pensionado</option>
                                </select>
                            </div>

                          

                            <div class="campo">
                                <label class="etiqueta">Salario mensual (COP)</label>
                                <input v-model="responsable.monthly_salary" type="number" class="entrada" required placeholder="Salario mensual (COP)">
                            </div>

                            <div class="campo">
                                <label class="etiqueta" v-if="responsable.employment_status == 'Pensionado'">Fecha en que comenzó a recibir su pensión</label>
                                <label class="etiqueta" v-else-if="responsable.employment_status == 'Independiente'">Fecha de antigüedad en la Cámara de Comercio / Fecha de inicio en esta actividad económica</label>
                                <label class="etiqueta" v-else>Fecha de inicio en el trabajo actual</label>
                                <input v-model="responsable.start_current_job_date" type="date" :max="today" class="entrada" required>
                                <!-- <p class="ayuda"  style="margin-bottom: 0;">Si tiene menos de 2 años en este trabajo, necesitamos un fiador con finca raiz</p> -->
                            </div>

                              <div class="campo" v-if="responsable.employment_status == 'Independiente'">
                                <label class="etiqueta">Descripción de su actividad economica</label>
                                <!-- <input v-model="responsable.business_description" type="text" class="entrada" placeholder="Descripción de su actividad economica"> -->
                                <textarea v-model="responsable.business_description"
                                    class="entrada"
                                    placeholder="Descripción de su actividad económica"
                                    rows="4"
                                    cols="50"></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="grupo-campos">
                        <h3 class="subtitulo">Documentos Requeridos (PDF)</h3>
                        <div class="campos-grid">
                            <div class="campo">
                                <label class="etiqueta">Documento de identidad</label>
                                <input type="file" class="entrada pl-3" accept=".pdf" required
                                        @change="e => manejarArchivo(e, responsable, 'document_id')">
                            </div>

                            <!-- <template v-if="responsable.employment_status === 'Empleado'"> -->
                            <template v-if="['Empleado - Termino Fijo', 'Empleado - Termino Indefinido', 'Empleado - Prestacion de Servicios'].includes(responsable.employment_status)">
                                <div class="campo">
                                    <label class="etiqueta">Certificado laboral</label>
                                    <input type="file" class="entrada pl-3" accept=".pdf" required
                                        @change="e => manejarArchivo(e, responsable, 'document_certf')">
                                    <p class="ayuda"  style="margin-bottom: 0;">Debe incluir salario y antigüedad</p>
                                </div>

                                <div v-for="n in 3" :key="n" class="campo">
                                    <label class="etiqueta">Desprendible de pago {{ n }}</label>
                                    <input type="file" class="entrada pl-3" accept=".pdf" required
                                        @change="e => manejarArchivo(e, responsable, `document_pay_${n}`)">
                                </div>
                            </template>

                            <template v-else-if="responsable.employment_status === 'Independiente'">
                                <div class="campo">
                                    <label class="etiqueta">Certificado de cámara de comercio</label>
                                    <input type="file" class="entrada pl-3" accept=".pdf" required
                                        @change="e => manejarArchivo(e, responsable, 'document_certf')">
                                    <p class="ayuda"  style="margin-bottom: 0;">En caso de no contar con el certificado de la Cámara de Comercio, suba un documento que describa brevemente su actividad económica.</p>
                                </div>

                                <div v-for="n in 3" :key="n" class="campo">
                                    <label class="etiqueta">Extracto bancario {{ n }}</label>
                                    <input type="file" class="entrada pl-3" accept=".pdf" required
                                        @change="e => manejarArchivo(e, responsable, `document_pay_${n}`)">
                                </div>
                            </template>

                            <template v-else-if="responsable.employment_status === 'Pensionado'">
                                <div class="campo">
                                    <label class="etiqueta">Constancia de Pensión</label>
                                    <input type="file" class="entrada pl-3" accept=".pdf" required
                                        @change="e => manejarArchivo(e, responsable, 'document_certf')">
                                </div>

                                <div v-for="n in 3" :key="n" class="campo">
                                    <label class="etiqueta">Extracto bancario {{ n }}</label>
                                    <input type="file" class="entrada pl-3" accept=".pdf" required
                                        @change="e => manejarArchivo(e, responsable, `document_pay_${n}`)">
                                </div>
                            </template>

                            <div class="campo">
                                <label class="etiqueta">Otro Documento</label>
                                <input type="file" class="entrada pl-3" accept=".pdf"
                                        @change="e => manejarArchivo(e, responsable, 'document_other')">
                                <p class="ayuda"  style="margin-bottom: 0;">Adjunte cualquier documento que respalde sus ingresos o que considere relevante para su solicitud.</p>
                            </div>

                        </div>
                    </div>

                    <!-- <div v-if="necesitaFiador(responsable)" class="grupo-campos fiador"> -->
                    <div v-if="necesitaFiadorComputeds[index]" class="grupo-campos fiador">
                        <h3 class="subtitulo">📝 Información del Fiador</h3>
                        <div class="campos-grid">
                            <div class="campo">
                                <label class="etiqueta">Nombre completo del fiador</label>
                                <input v-model="responsable.guarantor_full_name" type="text" class="entrada" required placeholder="Nombre completo del fiador">
                            </div>

                            <div class="campo">
                                <label class="etiqueta">Tipo de documento</label>
                                <select v-model="responsable.guarantor_document_type" class="entrada" required>
                                    <option value="" disabled selected>Seleccione un tipo de documento</option>
                                    <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
                                    <option value="Pasaporte">Pasaporte</option>
                                    <option value="Cédula de Extranjería">Cédula de Extranjería</option>
                                    <option value="Permiso por Protección Temporal">Permiso por Protección Temporal</option>
                                </select>
                            </div>

                            <div class="campo">
                                <label class="etiqueta">Número de documento</label>
                                <input v-model="responsable.guarantor_document_number" type="text" class="entrada" required placeholder="Número de documento">
                            </div>

                            <div class="campo">
                                <label class="etiqueta">Certificado de libertad (PDF)</label>
                                <input type="file" class="entrada pl-3" accept=".pdf" required
                                        @change="e => manejarArchivo(e, responsable, 'guarantor_property_cert')">
                                <p class="ayuda">Certificado de libertad y tradición de la propiedad</p>
                            </div>
                        </div>
                    </div>

                    <div class="grupo-campos">
                        <h3 class="subtitulo" style="margin-bottom: 0;">➕ Ingresos Adicionales</h3>
                        <p class="ayuda" style="margin-top: 0; margin-left: 30px;">Usa este botón si cuentas con ingresos adicionales a tu {{ responsable.employment_status === 'Pensionado' ? 'pension' : responsable.employment_status === 'Independiente' ? 'negocio' : "empleo" }}.</p>

                        <div v-for="(ingreso, i) in responsable.AdditionalIncome" :key="i" style="margin-bottom: 20px;">
                            <div class="campos-grid ingreso" style="padding: 24px;">
                                <div class="campo">
                                    <input v-model="ingreso.monthly_amount" type="number" @input="forceUpdate" class="entrada" placeholder="Monto mensual (COP)">
                                </div>

                                <div class="campo">
                                    <input v-model="ingreso.description" type="text" class="entrada" placeholder="Fuente de ingreso">
                                </div>

                                <div class="campo">
                                    <input type="file" class="entrada  pl-3" accept=".pdf"
                                        @change="e => manejarArchivo(e, ingreso, 'income_cert')">
                                    <p class="ayuda"  style="margin-bottom: 0;">Adjunta un comprobante (recibo, estado de cuenta, contrato, etc.) que respalde este ingreso adicional</p>
                                </div>

                                <button type="button" class="boton-eliminar" @click="eliminarIngreso(index, i)">Eliminar</button>
                            </div>
                            <!-- <hr style="width: 100%; border: 1px dashed #d7b377;" v-if="i < responsable.AdditionalIncome.length - 1"> -->
                        </div>
                        <button type="button" class="boton-secundario" @click="agregarIngreso(index)" v-if=" responsable.AdditionalIncome.length <= 2">
                            Añadir Ingreso
                        </button>
                    </div>
                </div>
            </div>

            <button type="button" class="boton-primario" @click="agregarResponsable" v-if="formData.FinancialResponsible.length <= 2">
                ➕ Añadir co-solicitante
            </button>
            <p class="ayuda " v-if="formData.FinancialResponsible.length <= 2" style="margin-bottom: 2rem;">Utiliza este botón si más de una persona será responsable del arriendo.</p>

            <div class="seccion">
                <h2 class="titulo-seccion" style="margin-bottom: 0px;">👥 Personas que Vivirán en la Propiedad</h2>
                <p class="ayuda" style="margin-left: 0px;">Importante: Esta sección debe incluir a todas las personas que residirán en el inmueble, aunque ya hayan sido ingresadas como solicitantes principales o co-solicitantes.</p>
                <div v-for="(conviviente, i) in formData.Cohabitant" :key="i" class="conviviente" style="margin-bottom: 20px;">
                    <div class="campos-grid" style="padding: 24px;">
                        <div class="campo">
                            <input v-model="conviviente.first_name" type="text" class="entrada" placeholder="Nombre" required>
                        </div>

                        <div class="campo">
                            <input v-model="conviviente.last_name" type="text" class="entrada" placeholder="Apellido" required>
                        </div>

                        <div class="campo">
                            <input v-model="conviviente.document_number" type="text" class="entrada" placeholder="Número de documento" required>
                        </div>

                        <div class="campo">
                            <select v-model="conviviente.occupation" class="entrada" required>
                                <option value="" disabled selected>Seleccione una ocupación</option>
                                <option value="Hogar">Hogar</option>
                                <option value="Empleado">Empleado</option>
                                <option value="Independiente">Independiente</option>
                                <option value="Estudiante">Estudiante</option>
                                <option value="Pensionado">Pensionado</option>
                            </select>
                        </div>

                        <div class="campo">
                            <input v-model="conviviente.age" type="number" :max="today" class="entrada" placeholder="Edad(años)" required>
                        </div>

                        <div class="campo">
                            <input v-model="conviviente.relationship" type="text" class="entrada" placeholder="Parentesco con el aplicante principal" required>
                        </div>

                        <button type="button" class="boton-eliminar" @click="eliminarConviviente(i)">Eliminar</button>

                    </div>
                    <!-- <hr style="width: 100%; border: 1px dashed #d7b377;" v-if="i < formData.Cohabitant.length - 1"> -->
                </div>
                <button type="button" class="boton-secundario" @click="agregarConviviente"  v-if="formData.Cohabitant.length <= 6">
                    Añadir Residente
                </button>
            </div>

            <div class="seccion">
                <h2 class="titulo-seccion" style="margin-bottom: 0px;">🐾 Mascotas</h2>
                <p class="ayuda" style="margin-left: 0px;">¿Tienes más de una mascota? Haz clic en "añadir mascota" por cada una. 🐶🐱</p>
                <div v-for="(mascota, i) in formData.Pet" :key="i" class="mascota" style="margin-bottom: 20px;">
                    <div class="campos-grid" style="padding: 24px;">
                        <div class="campo">
                            <select v-model="mascota.type" class="entrada" required>
                                <option value="" disabled selected>Seleccione una mascota</option>
                                <option value="Perro">Perro</option>
                                <option value="Gato">Gato</option>
                                <option value="Pez">Pez</option>
                                <option value="Ave">Ave</option>
                                <option value="Conejo">Conejo</option>
                                <option value="Tortuga">Tortuga</option>
                                <option value="Iguana">Iguana</option>
                                <option value="Gallina">Gallina</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>

                        <div class="campo">
                            <select v-model="mascota.sex" class="entrada" required>
                                <option value="" disabled selected>Seleccione un sexo</option>
                                <option value="Hembra">Hembra</option>
                                <option value="Macho">Macho</option>
                            </select>
                        </div>

                        <div class="campo">
                            <select v-model="mascota.size" class="entrada" required>
                                <option value="" disabled selected>Seleccione un tamaño</option>
                                <option value="Pequeño">Pequeño</option>
                                <option value="Mediano">Mediano</option>
                                <option value="Grande">Grande</option>
                            </select>
                        </div>

                        <button type="button" class="boton-eliminar" @click="eliminarMascota(i)">Eliminar</button>
                    </div>
                    <!-- <hr style="width: 100%; border: 1px dashed #d7b377;" v-if="i < formData.Pet.length - 1"> -->
                </div>
                <button type="button" class="boton-secundario" @click="agregarMascota" v-if="formData.Pet.length <= 2">
                    Añadir Mascota
                </button>
            </div>

            <div class="seccion">
                <h2 class="titulo-seccion" style="margin-bottom: 0;">🚗 Parqueaderos Requeridos</h2>
                <p class="ayuda" style="margin-left: 0px;">Haz clic en "Añadir Vehículo" para cada vehículo que necesita parqueadero.</p>
                <div v-for="(parqueadero, i) in formData.ParkingNeed" :key="i" class="parqueadero" style="margin-bottom: 20px;">
                    <div class="campos-grid" style="padding: 24px;">
                        <div class="campo">
                            <select v-model="parqueadero.vehicle_type" class="entrada" required>
                                <option value="" disabled selected>Seleccione un vehiculo</option>
                                <option value="Carro">Carro</option>
                                <option value="Moto">Moto</option>
                            </select>
                        </div>

                        <button type="button" class="boton-eliminar" @click="eliminarParqueadero(i)">Eliminar</button>
                    </div>
                    <!-- <hr style="width: 100%; border: 1px dashed #d7b377;" v-if="i < formData.ParkingNeed.length - 1"> -->
                </div>
                <button type="button" class="boton-secundario" @click="agregarParqueadero" v-if="formData.ParkingNeed.length <= 2">
                    Añadir Vehículo
                </button>
            </div>

            <!-- <button type="submit" class="boton-enviar" style="margin-bottom: 50px;"> -->
            <button class="boton-enviar" style="margin-bottom: 50px;" @click.prevent="validarFormulario">
                📤 Enviar Solicitud
            </button>
        </form>
    </div>
  </template>



  <script setup>

    import { ref, onMounted, computed } from 'vue';
    import Swal from 'sweetalert2';
    import tenantApplicationApi from '@/api/tenantApplication';
    import { useRoute } from 'vue-router'
    import property from '@/api/property.js';
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const route = useRoute()

    const tenantApplicationResource = new tenantApplicationApi();
    const propertyResource = new property();

    const thinking = ref(false);

    onMounted(async () => {

        loading.value = true;

        await propertyResource.checkIfPropertyApplicationOpen({sku: route.params.propertysku}).then(response => {
            if (response && response.success) {
                thinking.value = true;
            } else {
                router.push({ name: '404'})
            }
        }).catch(error => {
            router.push({ name: '404'})
        });


        loading.value = false;

    });

    const formData = ref({
        property_id: route.params.propertysku,
        move_in_date: '',
        FinancialResponsible: [crearResponsable()],
        Cohabitant: [],
        Pet: [],
        ParkingNeed: []
    });

    const today = new Date().toISOString().split('T')[0]

    // Funciones para manejar dinámicamente los elementos
    const agregarResponsable = () => {
        formData.value.FinancialResponsible.push(crearResponsable());
    };

    const eliminarResponsable = (index) => {
        formData.value.FinancialResponsible.splice(index, 1);
    };

    const agregarIngreso = (responsableIndex) => {
        formData.value.FinancialResponsible[responsableIndex].AdditionalIncome.push({
            monthly_amount: '',
            description: '',
            income_cert: null
        });
    };

    const eliminarIngreso = (responsableIndex, ingresoIndex) => {
        formData.value.FinancialResponsible[responsableIndex].AdditionalIncome.splice(ingresoIndex, 1);
    };

    const agregarConviviente = () => {
        formData.value.Cohabitant.push({
            first_name: '',
            last_name: '',
            document_number: '',
            occupation: '',
            age: ''
        });
    };

    const eliminarConviviente = (index) => {
        formData.value.Cohabitant.splice(index, 1);
    };

    const agregarMascota = () => {
        formData.value.Pet.push({
            type: '',
            sex: '',
            size: ''
        });
    };

    const eliminarMascota = (index) => {
        formData.value.Pet.splice(index, 1);
    };

    const agregarParqueadero = () => {
        formData.value.ParkingNeed.push({
            vehicle_type: ''
        });
    };

    const eliminarParqueadero = (index) => {
        formData.value.ParkingNeed.splice(index, 1);
    };

    const manejarArchivo = (event, objetivo, campo) => {

        if (event.target.files[0].type == 'application/pdf') {

            objetivo[campo] = event.target.files[0];
            const inputElement = event.target;
            if (event.target.files.length > 0) {
                inputElement.classList.add('has-file');
            } else {
                inputElement.classList.remove('has-file');
            }

        }else{
            Swal.fire({
                icon: 'error',
                title: 'Formato incorrecto',
                text: 'Solo se permiten archivos PDF',
                timer: 3000
            });
            objetivo[campo] = null;
            event.target.value = '';
        }

    };



/*    const necesitaFiador = (responsable) => {
        if (!responsable.start_current_job_date) return false;
        const inicio = new Date(responsable.start_current_job_date);
        const diff = Date.now() - inicio.getTime();
        return (diff / (1000 * 60 * 60 * 24 * 365)) < 2;
    };*/


    const necesitaFiador = (responsable, index) => {
        // Always return false for co-solicitantes (index > 0)
        if (index > 0) return false;
        
        // For principal applicant (index === 0)
        const totalIncome = formData.value.FinancialResponsible.reduce((sum, r) => {
            const additionalIncome = r.AdditionalIncome.reduce((incomeSum, income) => 
                incomeSum + (parseFloat(income.monthly_amount) || 0)
            , 0);
            return sum + (parseFloat(r.monthly_salary) || 0) + additionalIncome;
        }, 0);

        
        // Check if total income is greater than 3,000,000
        if (totalIncome < 3000000) return true;
        
        // Check if anyone (principal or co-solicitantes) has more than 2 years working
        const hasExperiencedWorker = formData.value.FinancialResponsible.some(r => {
            if (!r.start_current_job_date) return false;
            const startDate = new Date(r.start_current_job_date);
            const diff = Date.now() - startDate.getTime();
            return (diff / (1000 * 60 * 60 * 24 * 365)) >= 2;
        });
        
        if (hasExperiencedWorker) return false;
        
        // If none of the above conditions are met, check if this specific applicant needs a guarantor
        if (!responsable.start_current_job_date) return true;
        const inicio = new Date(responsable.start_current_job_date);
        const diff = Date.now() - inicio.getTime();
        return (diff / (1000 * 60 * 60 * 24 * 365)) < 2;
    };

    const forceUpdate = () => {
        formData.value = {...formData.value};
    };

    const calcularNecesitaFiador = (responsable, index) => {
        // Always return false for co-solicitantes
        if (index > 0) return false;
        
        // Calculate total income
        const totalIncome = formData.value.FinancialResponsible.reduce((sum, r) => {
            const additionalIncome = r.AdditionalIncome.reduce((incomeSum, income) => 
            incomeSum + (parseFloat(income.monthly_amount) || 0), 0);
            return sum + (parseFloat(r.monthly_salary) || 0) + additionalIncome;
        }, 0);
        
        // Check if total income > 3,000,000
        if (totalIncome < 3000000) return true;
        
        // Check if anyone has > 2 years experience
        const hasExperiencedWorker = formData.value.FinancialResponsible.some(r => {
            if (!r.start_current_job_date) return false;
            const startDate = new Date(r.start_current_job_date);
            const diff = Date.now() - startDate.getTime();
            return (diff / (1000 * 60 * 60 * 24 * 365)) >= 2;
        });
        
        if (hasExperiencedWorker) return false;
        
        // Check this applicant's work duration
        if (!responsable.start_current_job_date) return true;
        const inicio = new Date(responsable.start_current_job_date);
        const diff = Date.now() - inicio.getTime();
        return (diff / (1000 * 60 * 60 * 24 * 365)) < 2;
    };

    // Then update your computed property to use this function
    const necesitaFiadorComputeds = computed(() => {
        return formData.value.FinancialResponsible.map((r, i) => calcularNecesitaFiador(r, i));
    });

    const loading = ref(false);

    const isFieldValid = (value) => {
        return value !== null && value !== undefined && value !== '';
    };

    const validateObject = (obj, path = '') => {
        for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            const currentPath = path ? `${path}.${key}` : key;

            if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
                validateObject(value[i], `${currentPath}[${i}]`);
            }
            } else if (typeof value === 'object' && value !== null && !(value instanceof File)) {
            validateObject(value, currentPath);
            } else if (!isFieldValid(value)) {

                if(key == "business_description"){
                    if(obj.employment_status != "Independiente"){
                        return true;
                    }
                }

                if(key == 'document_other') return true;

                Swal.fire(
                    'Error',
                    'Todos los campos deben ser completados con el formato correcto.',
                    'error'
                );
                return false;
            }
        }
        }
        return true;
    };

    const validarFormulario = async () => {

        const form = document.querySelector('.formulario');
        // if (!form.checkValidity()) {
        //     await Swal.fire(
        //         'Error',
        //         'Por favor complete todos los campos requeridos',
        //         'error',
        //     );
        //     form.reportValidity();
        //     return;
        // }

        if (!form.reportValidity()) {
            Swal.fire(
                'Error',
                'Todos los campos deben ser completados con el formato correcto.',
                'error',
            );
            return;
        }

        
        // Validate FinancialResponsibles, including guarantor fields if needed
        for (const [index, responsable] of formData.value.FinancialResponsible.entries()) {
        //for (const responsable of formData.value.FinancialResponsible) {
            // Validate the basic fields of responsable, EXCLUDING guarantor fields.
            const {
                guarantor_full_name,
                guarantor_document_type,
                guarantor_document_number,
                guarantor_property_cert,
                ...basicResponsableData
            } = responsable;

            if (!validateObject(basicResponsableData)) {
            return;
            }

            if (calcularNecesitaFiador(responsable, index)) {
                if (!isFieldValid(responsable.guarantor_full_name)) {
                    Swal.fire(
                    'Error',
                    'Por favor, complete el nombre completo del fiador.',
                    'error'
                    );
                    return;
                }
                if (!isFieldValid(responsable.guarantor_document_type)) {
                    Swal.fire(
                    'Error',
                    'Por favor, complete el tipo de documento del fiador.',
                    'error'
                    );
                    return;
                }
                if (!isFieldValid(responsable.guarantor_document_number)) {
                    Swal.fire(
                    'Error',
                    'Por favor, complete el número de documento del fiador.',
                    'error'
                    );
                    return;
                }
                if (!responsable.guarantor_property_cert) {
                    Swal.fire(
                    'Error',
                    'Por favor, adjunte el certificado de libertad del fiador.',
                    'error'
                    );
                    return;
                }
            }
        }

        // Ensure at least one cohabitant
        if (!formData.value.Cohabitant || formData.value.Cohabitant.length === 0) {
            Swal.fire(
            'Error',
            'Debe haber al menos una persona que vivirá en la propiedad.',
            'error'
            );
            return;
        }
        // Validate Cohabitants
        for (let i = 0; i < formData.value.Cohabitant.length; i++) {
            const cohabitant = formData.value.Cohabitant[i];
            if (!isFieldValid(cohabitant.first_name)) {
            Swal.fire('Error', `Por favor, complete el nombre del residente ${i + 1}.`, 'error');
            return;
            }
            if (!isFieldValid(cohabitant.last_name)) {
            Swal.fire('Error', `Por favor, complete el apellido del residente ${i + 1}.`, 'error');
            return;
            }
            if (!isFieldValid(cohabitant.document_number)) {
            Swal.fire('Error', `Por favor, complete el n\u00famero de documento del residente ${i + 1}.`, 'error');
            return;
            }
            if (!isFieldValid(cohabitant.occupation)) {
            Swal.fire('Error', `Por favor, complete la ocupaci\u00f3n del residente ${i + 1}.`, 'error');
            return;
            }
            if (!isFieldValid(cohabitant.age)) {
            Swal.fire('Error', `Por favor, complete la edad del residente ${i + 1}.`, 'error');
            return;
            }
            if (!isFieldValid(cohabitant.relationship)) {
            Swal.fire('Error', `Por favor, complete el parentesco del residente ${i + 1}.`, 'error');
            return;
            }
        }

        loading.value = true;

        await tenantApplicationResource.createTenantApplication(formData.value).then((response) => {
            if(response && response.success) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Solicitud enviada!',
                    text: 'Su aplicación ha sido recibida exitosamente'
                });
                formData.value = {
                    property_id: route.params.propertysku,
                    move_in_date: '',
                    FinancialResponsible: [crearResponsable()],
                    Cohabitant: [],
                    Pet: [],
                    ParkingNeed: []
                };
            } else {
                let errorMsg = 'Error desconocido';

                if (response?.errors) {
                    const messages = Object.values(response.errors).flat();
                    errorMsg = messages.join('\n');
                } else if (response?.message) {
                    errorMsg = response.message;
                }

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorMsg
                });
            }
        }).catch((error) => {
            let errorMsg = 'Error al enviar la solicitud';

            if (error.response && error.response.data) {
                if (typeof error.response.data === 'string') {
                    errorMsg = error.response.data;
                } else if (error.response.data.message) {
                    errorMsg = error.response.data.message;
                } else if (error.response.data.errors) {
                    // Laravel validation errors
                    const messages = Object.values(error.response.data.errors).flat();
                    errorMsg = messages.join('\n');
                }
            }

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMsg
            });
        });

        loading.value = false;

    };

    const construirFormData = (formDataObj, data, parentKey = '') => {
        if (data && typeof data === 'object' && !(data instanceof File)) {
            Object.entries(data).forEach(([key, value]) => {
                const formKey = parentKey ? `${parentKey}[${key}]` : key;
                if (Array.isArray(value)) {
                    value.forEach((item, index) => {
                        construirFormData(formDataObj, item, `${formKey}[${index}]`);
                    });
                } else if (typeof value === 'object' && value !== null) {
                    construirFormData(formDataObj, value, formKey);
                } else if (value instanceof File) {
                    formDataObj.append(formKey, value);
                } else {
                    formDataObj.append(formKey, value);
                }
            });
        }
    };

    function crearResponsable() {
        return {
            full_name: '',
            email: '',
            phone_number: '',
            document_type: '',
            document_number: '',
            birthdate: '',
            nationality: '',
            employment_status: '',
            monthly_salary: '',
            start_current_job_date: '',
            business_description: "",
            document_id: null,
            document_certf: null,
            document_pay_1: null,
            document_pay_2: null,
            document_pay_3: null,
            document_other: null,
            guarantor_full_name: '',
            guarantor_document_type: '',
            guarantor_document_number: '',
            guarantor_property_cert: null,
            AdditionalIncome: []
        };
    }
  </script>

  <style scoped>


    .container {
        margin: 0 auto;
        margin-top: 50px;
        /* padding: 2rem; */
        background-color: #f8f5f0;
        min-height: 100vh;
        /* border-radius: 25px; */
    }

    .titulo-principal {
        color: #8f754f;
        text-align: center;
        margin-bottom: 2rem;
        font-size: 2.5rem;
        font-weight: 800;
    }

    .seccion {
        background: white;
        border-radius: 36px;
        padding: 1.5rem;
        margin-bottom: 2rem;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .titulo-seccion {
        color: #8f754f;
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
        font-weight: 800;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .contenedor-campos {
        display: grid;
        gap: 1.5rem;
    }

    .grupo-campos {
        border: 0px solid #d7b377;
        border-radius: 25px;
        background-color: #f8f5f0;
        padding: 24px;
        margin-bottom: 1.5rem;
    }

    .subtitulo {
        color: #8f754f;
        font-size: 1.3rem;
        margin-bottom: 1rem;
        font-weight: 700;
    }

    .campos-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
        background-color: #f8f5f0;
        border-radius: 25px;

    }

    .campo {
        margin-bottom: 0rem;
    }

    .etiqueta {
        display: block;
        margin-bottom: 0.5rem;
        color: #000000;
        font-weight: 500;
    }

    .ingreso{
        background-color: #ffffff !important;
        border-radius: 25px;
    }

    .entrada[type="file"].has-file {
        border: 1px solid #8f754f !important;
    }

    .ingreso .campo .entrada {
        background-color: #f8f5f0 !important;
    }

    .entrada {
        width: 100%;
        padding: 0.75rem;
        border: 0px solid #d7b377;
        border-radius: 25px;
        background-color: white;
    }

    .entrada:focus {
        outline: 0px solid #8f754f;
        border-color: transparent;
    }

    .boton-primario {
        background-color: #8f754f;
        color: white;
        border: none;
        padding: 1rem 2rem;
        border-radius: 25px;
        cursor: pointer;
        font-size: 1rem;
        transition: background-color 0.3s;
        width: 100%;
    }

    .boton-primario:hover {
        background-color: #6d5a3f;
    }

    .boton-secundario {
        background-color: #d7b377;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 25px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .boton-secundario:hover {
        background-color: #b59460;
    }

    .boton-eliminar {
        background: #d7b377;
        border: none;
        border-radius: 25px;
        color: white;
        height: 51px;
        cursor: pointer;
        padding: 0 0.5rem;
        align-self: center;
    }

    .boton-eliminar:hover {
        background-color: #b59460 ;
    }

    .boton-enviar {
        background-color: #8f754f;
        color: white;
        border: none;
        padding: 1.25rem;
        border-radius: 25px;
        font-size: 1.25rem;
        cursor: pointer;
        transition: background-color 0.3s;
        width: 100%;
        margin-top: 0;
    }

    .boton-enviar:hover {
        background-color: #6d5a3f;
    }

    .ayuda {
        color: #666;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }

    .fiador {
        background-color: #f8f5f0;
        border-radius: 25px;
        padding: 24px;
    }

    @media (max-width: 768px) {
        /* .container {
            padding: 1rem;
            border-radius: 0px;
        } */

        .titulo-principal {
            font-size: 2rem;
        }

        .campos-grid {
            grid-template-columns: 1fr;
        }
    }
  </style>
