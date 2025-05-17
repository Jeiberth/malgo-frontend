<template>
    <div v-if="loading" class="position-fixed start-0 w-100 h-100 d-flex justify-content-center align-items-center" style="background: rgba(0, 0, 0, 0.5); z-index: 1050; top: 0px;">
      <div class="spinner-border text-light" role="status">
          <span class="visually-hidden"></span>
      </div>
  </div>

  <div class="container">
    <div class="seccion">
      <h2 class="titulo-seccion">📄 Solicitud de Anexión de Documentos</h2>
      
      <div class="grupo-campos">
        <div class="campo">
          <label class="etiqueta">Subir documento PDF</label>
          <input 
            type="file" 
            class="entrada"
            accept=".pdf"
            @change="handleFileUpload"
            ref="fileInput"
          >
        </div>
        
        <p class="ayuda">
          Toda la información/documentos solicitados en el correo electrónico deben combinarse en un solo archivo PDF.
          Solo se permite un envío, así que asegúrese de incluir todo lo necesario.
        </p>
        
        <button 
          class="boton-primario mt-3"
          @click="submitDocument"
          :disabled="!documentFile"
        >
          Enviar Documento
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import tenantApplicationApi from '@/api/tenantApplication';


const tenantApplicationResource = new tenantApplicationApi();
const route = useRoute();
const router = useRouter();
const documentFile = ref(null);
const fileInput = ref(null);
const isValidAccess = ref(false);
const loading = ref(false);

onMounted(() => {
  const { tenApId, code } = route.query;
  
  if (!tenApId || !code) {
    router.push({ name: '404' });
    return;
  }
  
  // Verificar si tenApId*3141 == code
  if (Number(tenApId) * 3141 === Number(code)) {
    isValidAccess.value = true;
  } else {
    router.push({ name: '404' });
  }
});

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file && file.type === 'application/pdf') {
    documentFile.value = file;
  } else {
    Swal.fire('Error', 'Por favor seleccione un archivo PDF', 'error');
    resetFileInput();
  }
}

function resetFileInput() {
  documentFile.value = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
}

async function submitDocument() {
  loading.value = true;
  if (!documentFile.value || !isValidAccess.value) return;

  const formData = new FormData();
  formData.append('document_asked', documentFile.value);
  formData.append('tenApId', route.query.tenApId);

  try {
    const response = await tenantApplicationResource.submitAdditionalInfo(formData);
    if (response.success) {
      await Swal.fire({
        icon: 'success',
        title: 'Envío Exitoso',
        text: 'Su documento ha sido enviado correctamente. El equipo de Malgo se pondrá en contacto con usted pronto.',
        confirmButtonText: 'Aceptar'
      });
      router.push({ name: 'login' });
    } else {
      await Swal.fire({
        icon: 'error',
        title: 'Documento ya enviado',
        text: 'Este documento ya fue enviado anteriormente.',
        confirmButtonText: 'Aceptar'
      });
      router.push({ name: '404' });
    }
  } catch (error) {
    await Swal.fire({
      icon: 'error',
      title: 'Error en el envío',
      text: 'Hubo un error al enviar su documento. Por favor intente nuevamente.',
      confirmButtonText: 'Aceptar'
    });
    router.push({ name: '404' });
  }
  loading.value = false;
}
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f8f5f0;
  min-height: 100vh;
  border-radius: 25px;
}

.seccion {
  background: white;
  border-radius: 36px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  width: 600px;
  margin: auto;
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

.grupo-campos {
  overflow: hidden;
  border: 0px solid #d7b377;
  border-radius: 25px;
  background-color: #f8f5f0;
  padding: 24px;
  margin-bottom: 1.5rem;
}

.campo {
  margin-bottom: 1.5rem;
}

.etiqueta {
  display: block;
  margin-bottom: 0.5rem;
  color: #000000;
  font-weight: 500;
}

.entrada {
  width: 100%;
  padding: 0.75rem;
  border: 0px solid #d7b377;
  border-radius: 25px;
  background-color: white;
}

.ayuda {
  color: #666;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  font-style: italic;
}

.boton-primario {
  background-color: #8f754f;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  width: 100%;
}

.boton-primario:hover {
  background-color: #6d5a3f;
}

.boton-primario:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.mt-3 {
  margin-top: 1rem;
}
</style>