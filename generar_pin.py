# -*- coding: utf-8 -*-
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
    "1": {"id": "AzdTR59DhD0", "title": "Como listar y filtrar VMs en vCenter 9.1 con PowerCLI"},
    "2": {"id": "DIPPvQ34v8w", "title": "Como conectarse a vCenter 9.1 con PowerCLI"},
    "3": {"id": "l0zXbUCbb68", "title": "Domina el Almacenamiento en VMware con PowerCLI: Datastores, LUNs y Reportes CSV"}
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
    
    if hash_val & 0x80000000:
        hash_val = -((~hash_val + 1) & 0xFFFFFFFF)
        
    abs_num = (abs(hash_val) % 900) + 100
    return f"RIV{abs_num}"

if __name__ == "__main__":
    print("\n==========================================================")
    print(" SELECCIONA EL VIDEO DE YOUTUBE:")
    print(" 1. Como listar y filtrar VMs en vCenter 9.1 con PowerCLI")
    print(" 2. Como conectarse a vCenter 9.1 con PowerCLI")
    print(" 3. Domina el Almacenamiento en VMware con PowerCLI: Datastores, LUNs y Reportes CSV")
    print("==========================================================")
    
    try:
        v_option = input("Elige la opcion del video (1, 2 o 3, por defecto 1): ").strip()
    except Exception:
        v_option = "1"
        
    if v_option not in VIDEOS:
        v_option = "1"
        
    video_info = VIDEOS[v_option]
    video_id = video_info["id"]
    
    try:
        user = input("\nIngresa el usuario de YouTube (ej: @riveritatech): ").strip()
    except Exception:
        user = "@riveritatech"
        
    clean_user = user.lower().replace('@', '').replace("'", "").replace('"', '')
    
    if not clean_user:
        print("x Usuario invalido.")
        sys.exit(1)
        
    history = load_history()
    user_key = f"{clean_user}_{video_id}"
    current_count = history.get(user_key, 0) + 1
    
    if current_count > 3:
        print(f"\n[!] ATENCION: Ya has generado {current_count - 1} PINs (maximo recomendado) para {user} en este video.")
        try:
            override = input("Deseas generar un nuevo PIN de todas formas? (s/n): ").strip().lower()
        except Exception:
            override = "s"
        if override != 's':
            print("Operacion cancelada.")
            sys.exit(0)
            
    history[user_key] = current_count
    save_history(history)
    
    pin = calculate_pin_for_attempt(clean_user, video_id, current_count)
    
    print("\n==========================================================")
    print(f" VIDEO: {video_info['title']}")
    print(f" PIN AUTOMATICO NUEVO (PIN #{current_count}) PARA {user.upper()}:  {pin}")
    print("==========================================================")
    print(f"Responde en YouTube: Tu PIN unico de descarga es: {pin}\n")
