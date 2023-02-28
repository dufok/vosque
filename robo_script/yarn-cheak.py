import os

# Find all processes matching "yarn" and kill them with SIGKILL
os.system("pkill -9 yarn")

# Check if /tmp/turbod is not empty and has a subdir containing a file called "turbod.pid"
if os.path.exists("/tmp/turbod"):
    subdir = next((d for d in os.listdir("/tmp/turbod") if os.path.isdir(os.path.join("/tmp/turbod", d))), None)
    if subdir and os.path.exists(os.path.join("/tmp/turbod", subdir, "turbod.pid")):
        # Kill the process with the PID specified in /tmp/turbod/<subdir>/turbod.pid
        with open(os.path.join("/tmp/turbod", subdir, "turbod.pid"), "r") as f:
            pid = f.readline().strip()
            os.system(f"kill -9 {pid}")
    # Remove all files and directories in /tmp/turbod
    os.system("rm -rf /tmp/turbod/*")
