import os

# Check if /tmp/turbod is not empty and has a subdir containing a file called "turbod.pid"
subdir = next((d for d in os.listdir("/tmp/turbod") if os.path.isdir(os.path.join("/tmp/turbod", d))), None)
print(subdir)
if subdir and os.path.exists(os.path.join("/tmp/turbod", subdir, "turbod.pid")):
    print("Found a turbod.pid file")
    # Kill the process with the PID specified in /tmp/turbod/<subdir>/turbod.pid
    with open(os.path.join("/tmp/turbod", subdir, "turbod.pid"), "r") as f:
        pid = int(f.read().strip())
        print(f"Killing process with PID {pid}")
        os.system(f"kill -9 {pid}")
    # Remove the subdir
    os.system(f"rm -rf /tmp/turbod/{subdir}")

# Get a list of all yarn processes
pids_1 = os.popen('ps -ef | grep yarn | grep -v grep | awk \'{print $2}\'').read().strip().split("\n")

for pid_1 in pids_1:
    #os.system(f"kill -9 {pid_1}")
    print(f"Killing process with PID {pid_1}")