console.log("=== SISTEMA DE GESTIÓN DE TAREAS (TODO LIST) ===\n");

// 1. Función principal con closure para mantener el estado privado
function crearTodoList() {
  let tareas = []; // Estado privado

  return {
    // Agregar tareas (nombre obligatorio, prioridad opcional)
    agregarTarea: (nombre, prioridad = "media") => {
      const tarea = {
        id: tareas.length + 1,
        nombre,
        completada: false,
        prioridad
      };
      tareas.push(tarea);
      console.log(`✅ Tarea agregada: "${nombre}" [Prioridad: ${prioridad}]`);
    },

    // Marcar tarea como completada por id
    completarTarea: (id) => {
      const tarea = tareas.find(t => t.id === id);
      if (tarea) {
        tarea.completada = true;
        console.log(`🎯 Tarea completada: "${tarea.nombre}"`);
      } else {
        console.log(`❌ No se encontró tarea con id ${id}`);
      }
    },

    // Filtrar tareas por estado: "todas", "pendientes", "completadas"
    filtrarTareas: (estado = "todas") => {
      let filtradas;
      switch (estado) {
        case "pendientes":
          filtradas = tareas.filter(t => !t.completada);
          break;
        case "completadas":
          filtradas = tareas.filter(t => t.completada);
          break;
        default:
          filtradas = [...tareas];
      }
      console.log(`\n📋 Tareas (${estado}):`);
      filtradas.forEach(t => console.log(`- [${t.completada ? "x" : " "}] ${t.nombre} (Prioridad: ${t.prioridad})`));
      return filtradas;
    },

    // Obtener estadísticas
    obtenerEstadisticas: () => {
      const total = tareas.length;
      const completadas = tareas.filter(t => t.completada).length;
      const pendientes = total - completadas;
      console.log("\n📊 Estadísticas:");
      console.log(`Total: ${total}, Completadas: ${completadas}, Pendientes: ${pendientes}`);
      return { total, completadas, pendientes };
    }
  };
}

// ===== USO DEL SISTEMA =====
const miTodoList = crearTodoList();

// Agregar tareas (uso de parámetros avanzados)
miTodoList.agregarTarea("Estudiar JavaScript", "alta");
miTodoList.agregarTarea("Hacer ejercicio");
miTodoList.agregarTarea("Leer libro", "baja");

// Completar una tarea
miTodoList.completarTarea(2);

// Filtrar tareas
miTodoList.filtrarTareas("todas");
miTodoList.filtrarTareas("pendientes");
miTodoList.filtrarTareas("completadas");

// Obtener estadísticas
miTodoList.obtenerEstadisticas();
