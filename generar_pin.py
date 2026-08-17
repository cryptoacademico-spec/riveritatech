import sys
import json
import os

DB_FILE = os.path.join(os.path.dirname(__file__), "pin_history.json")

def load_history():
    if os.path.exists(DB_FILE):
        try:
            with open(DB_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return {}
    return {}

def save_history(history):
    try:
        with open(DB_FILE, "w", encoding="utf-8") as f:
            json.dump(history, f, indent=2)
    except Exception as e:
        pass

# Catalog of YouTube Videos
VIDEOS = {
    "1": {"id": "AzdTR59DhD0", "title": "Cómo listar y filtrar VMs en vCenter 9.1 con PowerCLI 🚀"},
    "2": {"id": "DIPPvQ34v8w", "title": "Cómo conectarse a vCenter 9.1 con PowerCLI 🚀"}
}

def calculate_pin_for_attempt(handle, video_id, attempt):
    clean = handle.strip().lower().replace('@', '').replace("'", "").replace('"', '')
    if not clean:
        return 'RIV000'
    
    salt = f"{clean}_{video_id}_v{attempt}_riveritasalt"
    hash_val = 0
    for char in salt:
        hash_val = ((hash_val << 5) - hash_val) + ord(char)
        hash_val &= 0xFFFFFFFF
    
    # 32-bit signed integer conversion
    if hash_val & 0x80000000:
        hash_val = -((~hash_val + 1) & 0xFFFFFFFF)
        
    abs_num = (abs(hash_val) % 900) + 100
    return f"RIV{abs_num}"

if __name__ == "__main__":
    print("\n==========================================================")
    print(" 📹 SELECCIONA EL VIDEO DE YOUTUBE:")
    print(" 1. Cómo listar y filtrar VMs en vCenter 9.1 con PowerCLI 🚀")
    print(" 2. Cómo conectarse a vCenter 9.1 con PowerCLI 🚀")
    print("==========================================================")
    
    v_option = input("Elige la opción del video (1 o 2, por defecto 1): ").strip()
    if v_option not in VIDEOS:
        v_option = "1"
        
    video_info = VIDEOS[v_option]
    video_id = video_info["id"]
    
    user = input("\nIngresa el usuario de YouTube (ej: @carloscelestino889): ").strip()
    clean_user = user.lower().replace('@', '').replace("'", "").replace('"', '')
    
    if not clean_user:
        print("❌ Usuario inválido.")
        sys.exit(1)
        
    history = load_history()
    user_key = f"{clean_user}_{video_id}"
    current_count = history.get(user_key, 0) + 1
    
    if current_count > 3:
        print(f"\n⚠️ ATENCIÓN: Ya has generado {current_count - 1} PINs (máximo recomendado de 3) para {user} en este video.")
        override = input("¿Deseas generar un nuevo PIN de todas formas? (s/n): ").strip().lower()
        if override != 's':
            print("Operación cancelada.")
            sys.exit(0)
            
    history[user_key] = current_count
    save_history(history)
    
    pin = calculate_pin_for_attempt(clean_user, video_id, current_count)
    
    print("\n==========================================================")
    print(f" 🎬 VIDEO: {video_info['title']}")
    print(f" 🔑 PIN AUTOMÁTICO NUEVO (PIN #{current_count}) PARA {user.upper()}:  {pin}")
    print("==========================================================")
    print(f"Responde en YouTube: Tu PIN único de descarga es: {pin}\n")
