# **TÀI LIỆU BA \- MINIGAME CƯỠI NGỰA VÀNG \- SĂN NGÀN LỘC**

## **1\. BUSINESS OVERVIEW**

### **1.1 Background (Giới thiệu)**

Minigame Tết **"Cưỡi ngựa vàng \- Săn ngàn lộc"** của Rovi Travel kết hợp văn hóa truyền thống và trò chơi dân gian nhằm tăng tương tác người dùng. Người chơi sẽ hoá thân thành Tebbi cưỡi ngựa du xuân qua 34 tỉnh thành và nhận lộc may mắn, kèm theo những kiến thức bổ ích, mang lại trải nghiệm thương hiệu tích cực.

### **1.2 Objectives (Mục Tiêu thành công của dự án)**

1. Đạt ít nhất 500 user trong 30 ngày đầu tiên.  
2. Thời gian ở trong game ít nhất 5 phút.  
3. Tỷ lệ điểm danh hàng ngày đạt ≥ 30% trong số người chơi active.  
4. Tăng thời gian sử dụng app trung bình lên ít nhất 15% so với baseline trước khi có minigame.

### **1.3 Target Users (Đối tượng người dùng)**

1. Người dùng chính: Người dùng đã truy cập và sử dụng app Rovi Travel, độ tuổi từ 18-45 tuổi, quan tâm đến du lịch và các hoạt động giải trí  
2. Đặc điểm:  
   1. Không yêu cầu kỹ năng đặc biệt, không cần hướng dẫn dài  
   2. Quen thuộc với các minigame đơn giản trên mobile  
   3. Có hứng thú với các hoạt động Tết và phần thưởng  
   4. Sẵn sàng dành 2-5 phút mỗi ngày để chơi  
3. Phân khúc:  
   1. Người dùng casual: Chơi giải trí, nhận thưởng nhỏ  
   2. Người dùng engaged: Muốn hoàn thành đủ 4 mảnh ghép để nhận thưởng lớn

###     **1.4 Scope (Phạm vi)**

#### **In scope (Trong phạm vi) \- PHASE 1 (1 tuần)**

**Tính năng core (Must-have)**:

1. Chơi minigame trong app Rovi Travel (mini app)  
2. Hệ thống gieo xúc xắc và di chuyển Tebbi trên các ô không cần animation phức tạp  
3. Hệ thống thưởng: hoàn tiền vào ví thưởng, câu chúc Tết, thêm lượt chơi  
4. Hệ thống mảnh ghép: 4 mảnh ghép hành trình vùng miền  
5. Điểm danh đơn giản: Mỗi ngày điểm danh nhận \+3 lượt (không cần chu kỳ phức tạp)  
6. Tích hợp với hệ thống ví thưởng để hoàn tiền   
7. Tracking cơ bản: Chỉ track các events quan trọng (game\_started, dice\_rolled, reward\_received, puzzle\_completed)  
8. Responsive design cho mobile-first experience (tối ưu cho 1 platform chính)

#### **Out of scope (Ngoài phạm vi) \- PHASE 1**

1. Thanh toán hoặc trả phí để mua lượt chơi  
2. Tích hợp với các hệ thống ngoài mini app (web app độc lập)  
3. Multiplayer hoặc tính năng cạnh tranh trực tiếp giữa người dùng  
4. Leaderboard hoặc ranking system  
5. Tính năng chat hoặc tương tác xã hội trong game  
6. Tích hợp với hệ thống đặt tour/booking  
7. **Hệ thống nhiệm vụ phức tạp** (chỉ giữ nhiệm vụ đơn giản nhất nếu có thời gian)  
8. **Chu kỳ điểm danh phức tạp** (ngày 1, 3, 7\) \- chỉ làm điểm danh đơn giản mỗi ngày \+1 lượt  
9. **Chia sẻ và mời bạn** \- tính năng này có thể làm sau  
10.  **Analytics dashboard phức tạp** \- chỉ track events cơ bản

## 

## **2\. PROJECT CONCEPT**

### **2.1 Project Name (Tên Dự án)**

Cưỡi ngựa vàng \- Săn ngàn lộc cùng ROVI TRAVEL

### **2.2 Project Description (Mô tả dự án)**

Minigame khám phá bản đồ Việt Nam mới với **34 tỉnh thành**. Người chơi gieo xúc xắc để thu thập bộ **4 mảnh ghép duy nhất** (Bắc, Trung, Nam và 1 Mảnh Hiếm) để đổi giải thưởng lớn.

### **2.3 Why this Project? (Tại sao làm dự án này?)**

1. **Luật chơi cực đơn giản**: Người chơi chỉ cần gieo xúc xắc và nhận thưởng, không cần học luật phức tạp (\<10 giây để hiểu)  
2. **Phù hợp với mùa Tết**: Tận dụng không khí Tết với các yếu tố văn hoá (lì xì, câu chúc, du xuân) để tạo cảm xúc tích cực  
3. **Tăng engagement**: Tạo lý do để người dùng quay lại app hàng ngày thông qua điểm danh và nhiệm vụ  
4. **Tạo cảm giác "trúng thưởng"**: Hệ thống thưởng ngẫu nhiên và mảnh ghép tạo cảm giác may mắn và mong đợi  
5. **Gắn kết với thương hiệu**: Tebbi và bản đồ Việt Nam gắn liền với thương hiệu du lịch Rovi Travel  
6. **Khả thi về kỹ thuật**: Chỉ cần các component cơ bản (xúc xắc, map đơn giản, reward random, counter) nên có thể triển khai nhanh.  
7. **Tăng retention**: Cơ chế vòng lặp và mảnh ghép khuyến khích người chơi quay lại để hoàn thành bộ sưu tập.

### **2.4. Chi tiết bàn cờ (SQUARE BOARD)**

Bố trí các ô dựa trên tỷ lệ cố định để đảm bảo cân bằng giữa thử thách và phần thưởng:

| Vị trí (ID) | Tên Ô | Số lượng | Tỷ lệ | Mô tả / Hiệu ứng |
| :---- | :---- | :---- | :---- | :---- |
| **1** | **START/FINISH** | 1 | 5% | Vị trí xuất phát. |
|  |  |  |  |  |
| **6, 16** | **SỰ KIỆN** | 2 | 10% | **Săn Mảnh Ghép:** Tỉ lệ rơi mảnh vùng miền hoặc mảnh Hiếm. |
| **3, 8, 13, 18** | **TIỀN THƯỞNG** | 4 | 20% | Hoàn tiền trực tiếp vào ví thưởng. |
| **7, 14, 19** | **THÊM LƯỢT** | 3 | 15% | Nhận ngay \+1 hoặc \+2 lượt gieo xúc xắc. |
| **4, 10, 17** | **THỬ THÁCH** | 3 | 15% | Lùi bước, đứng im hoặc bị troll. |
| **Còn lại** | **LỜI CHÚC/GIỚI THIỆU** | 6 | 30% | Hiện pop-up câu chúc |

### **2.5 Cơ chế kiếm lượt chơi (HỆ THỐNG VẬN HÀNH)**

Game không quảng cáo, lượt chơi được cấp theo các mốc sau:

1. **Tặng khởi tạo:** **10 lượt** khi chơi lần đầu.  
2. **Điểm danh:** **\+3 lượt** mỗi ngày khi đăng nhập.  
3. **Thưởng thành tích:**  
   1. Hoàn thành 1 tỉnh: **\+1 lượt**.  
   2. Hoàn thành tất cả các tỉnh trong 1 miền: **\+10 lượt**.  
4. **May mắn:** Nhận thêm lượt tại các ô **Thêm Lượt** trên bàn cờ.

### **2.6. Cơ chế mảnh ghép và bảo hiểm (QUAN TRỌNG)**

Hệ thống đảm bảo người chơi sẽ sở hữu đủ bộ mảnh ghép nếu hoàn thành bản đồ:

### **2.6.1. Mảnh Ghép Vùng Miền (3 Mảnh)**

1. **Cơ chế rơi:** Xuất hiện ngẫu nhiên tại ô **Sự kiện (6, 16\)**.  
2. *Mục đích:* Kéo dài thời gian trải nghiệm, tránh việc người chơi lấy hết mảnh vùng trong 1 ngày.  
3. **Bảo hiểm:** Nếu đã chơi hết toàn bộ tỉnh của một miền mà vẫn chưa có mảnh, hệ thống tự động tặng mảnh đó ở tỉnh cuối cùng.

### 

### **2.6.2. Mảnh Ghép Hiếm (Mảnh thứ 4\)**

Mảnh Hiếm chỉ xuất hiện khi đạt đủ 2 điều kiện:

1. **Điều kiện 1:** Người chơi phải sở hữu đủ **3 mảnh vùng miền** (Bắc, Trung, Nam).  
2. **Điều kiện 2:** Người chơi đã hoàn thành ít nhất **50% bản đồ (17/34 tỉnh thành)**.  
3. **Cơ chế rơi:** Khi thỏa mãn 2 điều kiện trên, mảnh Hiếm sẽ bắt đầu xuất hiện ngẫu nhiên tại các ô Sự kiện.  
4. **Bảo hiểm tối thượng:** Nếu hoàn thành toàn bộ **34 tỉnh** mà vẫn chưa có mảnh Hiếm, hệ thống sẽ chắc chắn tặng tại ô Finish tỉnh thứ 34\.

**2.7 Cơ chế hoàn tiền trúng thưởng**

	**2.7.1 Số tiền thưởng trong từng ô**

| Loại Thưởng | Số Tiền (VNĐ) | Tỷ lệ xuất hiện (trong nhóm thưởng) | Ý nghĩa/Tác dụng |
| :---- | :---- | :---- | :---- |
| **Giải An Ủi** | **68đ**  | 60% | "Lấy hên" là chính, chi phí thấp, giúp user trúng liên tục mà không cạn quỹ. |
| **Giải Khích Lệ** | **200đ**  | 30% | Cảm giác tích lũy, sắp đủ tiền mua cái gì đó nhỏ nhỏ. |
| **Giải May Mắn** | **2.026đ**  | 10% | Tạo sự bất ngờ ("Wow moment") để người chơi khoe lên mạng xã hội. |

	**2.7.2 Số tiền thưởng thu thập 4 mảnh**

		Ước tính 20.000

**3\. USER FLOW**

### **3.1 High-level Flow (Luồng người dùng tổng quan)**

**Luồng chính (Cập nhật theo game flow mới)**: Entry → Xem luật chơi (lần đầu, đơn giản) → Bản đồ Việt Nam tổng quát → Chọn tỉnh → Màn hình bàn cờ tỉnh → Gieo xúc xắc → Di chuyển trên bàn cờ 20 ô → Dừng tại ô → Nhận thưởng → Chơi tiếp → Hoàn thành tỉnh (ô 20\) → Quay về bản đồ → Chọn tỉnh tiếp theo → Thu thập đủ 4 mảnh ghép → Nhận thưởng lớn

**Luồng chi tiết (Tối giản)**:

1. **Entry**: Người dùng thấy banner/popup minigame trên app Rovi Travel → Click vào  
2. **Onboarding** (lần đầu, đơn giản): Xem popup hướng dẫn ngắn gọn luật chơi → Click "Bắt đầu" (có thể skip)  
3. **Bản đồ tổng quát**: Xem bản đồ Việt Nam với 34 tỉnh thành → Xem số lượt còn lại → Xem tiến độ hoàn thành → Click vào một tỉnh để chơi  
4. **Màn hình bàn cờ tỉnh**: Xem bàn cờ hình vuông 20 ô của tỉnh đã chọn → Xem vị trí hiện tại trên bàn cờ → Click nút "Gieo xúc xắc"  
5. **Roll Dice**: Xúc xắc quay (animation đơn giản) → Hiển thị số (1-6) → Marker di chuyển trên bàn cờ (animation cơ bản)  
6. **Land on Square**: Marker dừng tại một ô → Kích hoạt chức năng ô (Sự kiện/Tiền thưởng/Thêm lượt/Thử thách/Lời chúc) → Popup thưởng hiển thị  
7. **Reward Popup**: Hiển thị loại thưởng nhận được (tiền/câu chúc/lượt/mảnh ghép) → Click "Tiếp tục" → Quay về màn hình bàn cờ tỉnh  
8. **Hoàn thành tỉnh**: Khi đến ô FINISH (20) → Popup hoàn thành tỉnh → Nhận thưởng \+1 lượt → Quay về bản đồ tổng quát  
9. **Puzzle Check** (nếu nhận mảnh ghép tại ô Sự kiện): Tự động hiển thị popup mảnh ghép nhận được → Click "Tiếp tục"  
10. **Puzzle Complete** (nếu đủ 4 mảnh): Popup thông báo hoàn thành → Nhận thưởng lớn → Tiếp tục chơi  
11. **CTA đơn giản**: Chơi tiếp / Điểm danh (nếu có thời gian) / Quay lại bản đồ / Đóng

### **3.2 Entry Points (Điểm truy cập) \- Đơn giản hóa**

1. **Banner trên homepage**: Banner nổi bật với hình ảnh Tebbi và text "Cưỡi ngựa vàng \- Săn ngàn lộc" (ưu tiên)  
2. **Popup modal**: Popup tự động hiển thị khi người dùng vào app lần đầu (có thể tắt, không hiện lại)

### **3.3 Exit / CTA (Điểm thoát / Call-to-Action) \- Đơn giản hóa**

**Các CTA chính sau mỗi lượt chơi (Tối giản)**:

1. **"Chơi tiếp"**: Nếu còn lượt → Quay lại màn hình game để gieo tiếp (CTA chính)  
2. **"Điểm danh"**: Nếu chưa điểm danh hôm nay → Popup điểm danh đơn giản (nếu có thời gian)  
3. **"Xem mảnh ghép"**: Popup hiển thị tiến độ thu thập 4 mảnh ghép (có thể tích hợp vào Screen 2 \- Bản đồ tổng quát)  
4. **"Đóng"**: Thoát về trang chủ hoặc màn hình trước đó

**Điểm thoát hợp lý**:

1. Sau khi nhận thưởng và không còn lượt → Hiển thị CTA "Điểm danh" (nếu có) hoặc "Quay lại bản đồ" hoặc "Đóng"  
2. Sau khi hoàn thành tỉnh → Quay về bản đồ tổng quát với CTA "Chọn tỉnh tiếp theo"  
3. Sau khi hoàn thành 4 mảnh ghép → Nhận thưởng lớn và CTA "Tiếp tục chơi"  
4. Người dùng có thể đóng minigame bất cứ lúc nào và quay lại tiếp tục sau

## 

## 

## 

## **4\. BUSINESS RULES**

### **4.1 Business Rules Table**

| ID | Tên Luật | Mô Tả Chi Tiết | Mức Độ Ưu Tiên | Ghi Chú / Yêu Cầu Kỹ Thuật |
| :---- | :---- | :---- | :---- | :---- |
| BR01 | Luật gieo xúc xắc | Mỗi lượt chơi, người chơi gieo xúc xắc một lần và nhận số ngẫu nhiên từ 1-6. Tebbi di chuyển theo kết quả xúc xắc trong 20 ô bàn cờ. | High | Xúc xắc phải random thực sự, không được predict được. |
| BR02 | Luật nhận thưởng | Khi Tebbi dừng tại một ô, hệ thống random ngẫu nhiên theo tỷ lệ cố định để đảm bảo cân bằng giữa thử thách và phần thưởng. | High | Tỷ lệ đã được điều chỉnh. |
| BR03 | Luật về đích và mảnh ghép các vùng miền | Hoàn thành hết các tỉnh trong vùng sẽ nhận được mảnh ghép hoặc nhận ngẫu nhiên may mắn. Mảnh hiếm chỉ xuất hiện khi thu thập đủ 3 mảnh vùng miền và đã hoàn thành 50% tỉnh (17/34) | High | Mỗi vùng chỉ nhận 1 mảnh, không nhận nhiều mảnh cùng lúc.  |
| BR04 | Luật hoàn thành 4 mảnh ghép | Khi người chơi thu thập đủ 4 mảnh ghép khác nhau, hệ thống tự động trao thưởng lớn: hoàn tiền *xxx VNĐ* vào ví thưởng \+ thông báo "*Cưỡi Ngựa Vàng \- Rước Ngàn Lộc\! Bạn nhận được xxx VNĐ*" \+ người chơi có thể tiếp tục chơi để thu thập thêm tiền thưởng. Không reset bản đồ, giữ nguyên vị trí hiện tại. | High | Đây là milestone quan trọng nhất, cần có hiệu ứng đặc biệt. |
| BR05 | Luật điểm danh | Người chơi điểm danh hằng ngày nhận \+3 lượt quay | Medium |  |
| BR06 | Luật giới hạn lượt chơi | Người chơi bắt đầu với 10 lượt miễn phí. Lượt được cộng thêm qua: điểm danh, nhiệm vụ, thưởng trong game. Không có giới hạn tối đa số lượt tích lũy. Lượt không hết hạn trong thời gian diễn ra minigame. | High | Tránh cảm giác bị giới hạn quá nhiều. |
| BR07 | Luật validation lượt chơi | Trước mỗi lượt gieo xúc xắc, hệ thống phải kiểm tra số lượt còn lại. Nếu \= 0, hiển thị thông báo "Bạn đã hết lượt" và CTA "Điểm danh" hoặc "Xem nhiệm vụ". | High | Tránh lỗi khi người dùng cố gắng chơi khi hết lượt. |
| BR08 | Luật lưu tiến độ | Hệ thống phải lưu vị trí hiện tại của Tebbi, số lượt còn lại, số mảnh ghép đã có, và tiến độ điểm danh/nhiệm vụ. Người chơi có thể thoát và quay lại tiếp tục bất cứ lúc nào. | High | Critical cho user experience (trải nghiệm người dùng). |
| BR09 | Luật tích hợp ví thưởng | Khi người chơi nhận hoàn tiền (từ thưởng tỉnh hoặc hoàn thành 4 mảnh), số tiền phải được cộng vào ví thưởng ngay lập tức và hiển thị thông báo xác nhận. Nếu tích hợp lỗi, phải có cơ chế retry và log lỗi. | High | Critical cho trust (niềm tin) và user satisfaction (sự hài lòng). |

### 

### **4.2 Edge Cases (Trường hợp biên)**

1. **Hết lượt giữa chừng**: Nếu người chơi hết lượt khi đang ở giữa vòng (chưa về đích), tiến độ vẫn được lưu. Khi có lượt mới, có thể tiếp tục từ vị trí hiện tại.  
2. **Người chơi điểm danh trong ngày**: Hệ thống cho phép điểm danh 1 lần mỗi ngày.   
3. **Dữ liệu không đồng bộ giữa client và server**: Hệ thống phải có cơ chế sync: khi mở app, client phải fetch latest state từ server và cập nhật UI. Nếu có conflict, ưu tiên server state.  
4. **Người chơi chơi trên nhiều thiết bị**: Tiến độ phải được lưu trên server và sync giữa các thiết bị. Nếu người chơi chơi trên 2 thiết bị cùng lúc, thiết bị nào cập nhật sau sẽ overwrite thiết bị trước (last write wins).

## **5\. UI / UX SPEC**

### **5.1 Screen List (Danh sách màn hình)**

#### **Screen 1 – Entry/Landing Screen (Đơn giản hóa)**

1. **Purpose**: Màn hình đầu tiên khi người dùng click vào minigame từ banner/popup. Giới thiệu minigame và khuyến khích bắt đầu chơi.  
2. **Components**:  
3. Header: Logo/Tên "Cưỡi ngựa vàng \- Săn ngàn lộc"  
4. Hero image: Hình ảnh Tebbi cưỡi ngựa trên bản đồ Việt Nam (có thể dùng ảnh tĩnh)  
5. Text ngắn gọn: "Gieo xúc xắc, du xuân 34 tỉnh thành, nhận lộc Tết\!"  
6. Button chính: "Bắt đầu ngay" (CTA nổi bật)  
7. Close button (X) ở góc trên phải  
8. **User Actions**:  
9. Click "Bắt đầu ngay" → Hiển thị popup luật chơi ngắn gọn (nếu lần đầu) → Chuyển đến Screen 2 (Bản đồ tổng quát)  
10. Click "X" → Đóng và quay về trang trước  
11. **Lưu ý**: Có thể gộp với popup luật chơi thành 1 màn hình đơn giản

#### **Screen 2 – Rule Screen (Popup đơn giản)**

1. **Purpose**: Giải thích luật chơi ngắn gọn cho người chơi lần đầu (có thể skip).  
2. **Components**:  
3. **Popup overlay** (chiếm 80% màn hình, center):  
4. Header: "Luật chơi \- Cưỡi ngựa vàng \- Săn ngàn lộc" \+ Close button (X)  
5. Content ngắn gọn (3-4 dòng):  
6. "Gieo xúc xắc để di chuyển Tebbi qua 34 tỉnh thành"  
7. "Mỗi tỉnh nhận thưởng: tiền, câu chúc, hoặc lượt chơi"  
8. "Hoàn thành vòng nhận mảnh ghép, đủ 4 mảnh nhận thưởng lớn"  
9. Icons minh họa đơn giản (3 icons: xúc xắc, thưởng, mảnh ghép)  
10. Button: "Bắt đầu chơi" (CTA chính)  
11. Background dimmed  
12. **User Actions**:  
13. Click "Bắt đầu chơi" → Đóng popup và chuyển đến Screen 2 (Bản đồ tổng quát)  
14. Click "X" hoặc click outside → Đóng popup và chuyển đến Screen 2 (Bản đồ tổng quát)  
15. **Lưu ý**: Popup này chỉ hiển thị lần đầu, có thể skip dễ dàng

#### **Screen 2 – Bản Đồ Việt Nam Tổng Quát (Map Overview Screen)**

1. **Purpose**: Màn hình chính hiển thị bản đồ Việt Nam với 34 tỉnh thành, nơi người chơi chọn tỉnh để bắt đầu chơi bàn cờ 20 ô.  
2. **Components**:  
3. **Top bar** (đơn giản):  
4. Số lượt còn lại: "Lượt: X" (hiển thị nổi bật)  
5. Icon điểm danh nhỏ: Badge hiển thị nếu chưa điểm danh hôm nay  
6. Icon mảnh ghép nhỏ: Hiển thị "X/4" mảnh ghép đã có  
7. Button "Xem mảnh ghép" (optional)  
8. **Map area** (chiếm 80-85% màn hình):  
9. Bản đồ Việt Nam hình chữ S (SVG interactive hoặc hình ảnh với clickable areas)  
10. **34 tỉnh thành** được hiển thị rõ ràng với:  
11. Tên tỉnh hiển thị trên mỗi tỉnh (hoặc hiển thị khi hover/click)  
12. **Trạng thái tỉnh:**  
13. Tỉnh chưa chơi: Màu xám nhạt hoặc màu mặc định  
14. Tỉnh đã hoàn thành: Màu xanh lá với icon checkmark hoặc badge "Hoàn thành"  
15. Tỉnh đang chơi dở: Màu vàng/cam với badge "Đang chơi"  
16. Tỉnh có thể chơi: Highlight nhẹ, có thể click  
17. **Phân vùng miền:** Màu sắc nhẹ để phân biệt 3 miền (Bắc, Trung, Nam)  
18. **Progress indicators:**  
19. Số tỉnh đã hoàn thành: "Đã hoàn thành: X/34 tỉnh"  
20. Tiến độ theo miền: "Bắc: X/Y tỉnh", "Trung: X/Y tỉnh", "Nam: X/Y tỉnh"  
21. **Bottom info bar** (optional):  
22. Thông tin tổng quan: Tổng số lượt đã chơi, số mảnh ghép đã có  
23. Button "Điểm danh" (nếu chưa điểm danh)  
24. **User Actions**:  
25. Click vào một tỉnh thành → Kiểm tra lượt còn lại:  
26. Nếu có lượt → Chuyển đến Screen 3 (Màn hình bàn cờ tỉnh)  
27. Nếu hết lượt → Hiển thị popup "Bạn đã hết lượt" với CTA "Điểm danh" hoặc "Đóng"  
28. Click icon điểm danh → Popup điểm danh  
29. Click icon mảnh ghép → Popup hiển thị mảnh ghép  
30. Click vào tỉnh đã hoàn thành → Hiển thị popup thông tin tỉnh (tùy chọn) hoặc cho phép chơi lại  
31. **Visual States**:  
32. Tỉnh có thể chơi: Cursor pointer, có hiệu ứng hover (scale nhẹ hoặc glow)  
33. Tỉnh đã hoàn thành: Hiển thị icon check mark hoặc badge  
34. Tỉnh đang chơi dở: Hiển thị badge "Tiếp tục" hoặc icon đặc biệt  
35. **Animation**:  
36. Fade in khi load màn hình  
37. Hover effect khi di chuột qua tỉnh (scale hoặc glow)  
38. Transition mượt khi chuyển sang màn hình bàn cờ tỉnh

#### **Screen 3 – Màn Hình Bàn Cờ Tỉnh (Province Board Screen)**

1. **Purpose**: Màn hình hiển thị bàn cờ hình vuông 20 ô của tỉnh đã chọn, nơi người chơi gieo xúc xắc và di chuyển trên bàn cờ.  
2. **Components**:  
3. **Header bar**:  
4. Tên tỉnh đang chơi: "Tỉnh \[Tên\]" (hiển thị nổi bật)  
5. Button "Quay lại bản đồ" (icon mũi tên trái hoặc icon bản đồ)  
6. Số lượt còn lại: "Lượt: X" (hiển thị nhỏ)  
7. **Board area** (chiếm 60-70% màn hình, center):  
8. **Bàn cờ hình vuông** với 20 ô được sắp xếp theo layout:  
9. Ô số 1 (START) ở góc trên trái hoặc vị trí xuất phát  
10. Các ô được sắp xếp theo đường zigzag hoặc hình vuông 4x5 hoặc 5x4  
11. Ô số 20 (FINISH) ở vị trí cuối cùng  
12. **Mỗi ô hiển thị:**  
13. Số thứ tự ô (1-20)  
14. Icon/biểu tượng loại ô:  
15. START: Icon cờ xuất phát  
16. FINISH: Icon cờ đích  
17. SỰ KIỆN (6, 16): Icon ngôi sao hoặc gift box  
18. TIỀN THƯỞNG (3, 8, 13, 18): Icon VNĐ hoặc tiền vàng  
19. THÊM LƯỢT (7, 14, 19): Icon bao lì xì hoặc lượt  
20. THỬ THÁCH (4, 10, 17): Icon cảnh báo hoặc thử thách  
21. LỜI CHÚC (còn lại): Icon câu chúc hoặc pháo hoa  
22. Màu sắc phân biệt theo loại ô  
23. **Vị trí người chơi:**  
24. Icon Tebbi hoặc marker hiển thị tại ô hiện tại  
25. Animation khi di chuyển từ ô này sang ô khác  
26. **Trạng thái ô:**  
27. Ô đã đi qua: Màu xám nhạt hoặc có dấu checkmark  
28. Ô hiện tại: Highlight màu đỏ/vàng, có animation nhấp nháy nhẹ  
29. Ô chưa đến: Màu mặc định  
30. **Dice area** (phía dưới board):  
31. Xúc xắc lớn (có thể click để gieo)  
32. Button "Gieo xúc xắc" (nếu còn lượt) hoặc "Hết lượt" (disabled nếu \= 0\)  
33. Hiển thị số xúc xắc vừa gieo (nếu có)  
34. **Progress indicator**:  
35. Text: "Ô hiện tại: X/20" hoặc progress bar  
36. Thông tin: "Còn X ô nữa để hoàn thành"  
37. **User Actions**:  
38. Click "Gieo xúc xắc" hoặc click vào xúc xắc →  
39. Kiểm tra lượt còn lại:  
40. Nếu có lượt → Xúc xắc quay animation (1-2 giây) → Hiển thị số (1-6) → Di chuyển marker trên bàn cờ → Dừng tại ô mới → Kích hoạt chức năng ô  
41. Nếu hết lượt → Hiển thị popup "Bạn đã hết lượt" với CTA "Điểm danh" hoặc "Quay lại bản đồ"  
42. Click vào ô đã đi qua → Hiển thị popup thông tin ô (tùy chọn)  
43. Click "Quay lại bản đồ" → Quay về Screen 2 (Bản đồ tổng quát)  
44. Khi đến ô FINISH (20) →  
45. Hiển thị popup hoàn thành tỉnh → Nhận thưởng \+1 lượt → Quay về Screen 2 (Bản đồ tổng quát)  
46. **Chức năng các loại ô**:  
47. **START (1)**: Không có tác dụng, chỉ là điểm xuất phát  
48. **FINISH (20)**: Hoàn thành tỉnh, nhận \+1 lượt, quay về bản đồ  
49. **SỰ KIỆN (6, 16\)**: Popup săn mảnh ghép (có thể nhận mảnh vùng miền hoặc mảnh Hiếm)  
50. **TIỀN THƯỞNG (3, 8, 13, 18\)**: Popup nhận tiền vào ví thưởng  
51. **THÊM LƯỢT (7, 14, 19\)**: Popup nhận \+1 hoặc \+2 lượt  
52. **THỬ THÁCH (4, 10, 17\)**: Popup thử thách (lùi bước, đứng im, trừ xu)  
53. **LỜI CHÚC (còn lại)**: Popup câu chúc \+ thưởng xu nhỏ  
54. **Animation**:  
55. Xúc xắc quay 1-2 giây với CSS animation \+ sound effect  
56. Marker di chuyển từ ô này sang ô khác (slide hoặc path animation, 0.5-1 giây)  
57. Hiệu ứng pháo hoa khi dừng tại ô mới  
58. Highlight animation cho ô hiện tại (pulse hoặc glow)  
59. Confetti khi hoàn thành tỉnh (đến ô FINISH)  
60. **Lưu ý**:  
61. Tiến độ trên bàn cờ được lưu lại, người chơi có thể quay lại tiếp tục từ ô đã dừng  
62. Nếu hết lượt giữa chừng, khi có lượt mới có thể tiếp tục từ ô hiện tại

#### **Screen 4 – Reward Popup (Popup thưởng \- Đơn giản)**

1. **Purpose**: Hiển thị phần thưởng người chơi nhận được sau khi Tebbi dừng tại một tỉnh.  
2. **Components**:  
3. **Modal/Popup overlay** (chiếm 70-80% màn hình, center):  
4. Background màu Tết đơn giản (không cần hiệu ứng phức tạp)  
5. Tên tỉnh vừa đến (text đơn giản)  
6. **Reward content** (thay đổi theo loại thưởng):  
7. **Nếu là tiền**: Icon VNĐ \+ Số tiền lớn (2k/5k/10k) \+ Text "Hoàn tiền vào ví thưởng" \+ Câu chúc Tết ngắn  
8. **Nếu là câu chúc**: Icon đơn giản \+ Câu chúc Tết lớn (ví dụ: "An khang thịnh vượng")  
9. **Nếu là lượt**: Icon bao lì xì \+ Text "+1 lượt" hoặc "+2 lượt" \+ Câu chúc Tết ngắn  
10. Button "Tiếp tục" (CTA chính)  
11. **Background dimmed**: Màn hình phía sau bị làm mờ  
12. **User Actions**:  
13. Click "Tiếp tục" → Đóng popup và quay về Screen 3 (Màn hình bàn cờ tỉnh) hoặc Screen 2 (Bản đồ tổng quát) tùy ngữ cảnh  
14. Click outside popup → Đóng popup (optional)  
15. **Animation**:  
16. Popup fade in từ center (CSS transition) \+ sound effect  
17. Hiệu ứng pháo hoa khi hiển thị thưởng  
18. Confetti animation nếu là thưởng lớn (10k hoặc lượt)  
19. **Lưu ý**: Nếu về đích (hoàn thành vòng), popup này sẽ hiển thị thêm thông tin về mảnh ghép nhận được

#### **Screen 5 – Puzzle Popup (Popup mảnh ghép \- Đơn giản)**

1. **Purpose**: Hiển thị tiến độ thu thập 4 mảnh ghép hành trình (có thể tích hợp vào reward popup khi về đích).  
2. **Components**:  
3. **Modal/Popup overlay** (chiếm 70-80% màn hình, center):  
4. Header: "Mảnh ghép hành trình" \+ Close button  
5. **Puzzle grid**: 2x2 grid đơn giản hiển thị 4 mảnh ghép:  
6. Mảnh đã có: Icon/hình ảnh đơn giản với tên (Xuân Bắc, Xuân Trung, Xuân Nam, Xuân Biển đảo)  
7. Mảnh chưa có: Icon placeholder với dấu "?"  
8. **Progress text**: "Bạn đã có X/4 mảnh ghép"  
9. **Info text**: "Hoàn thành đủ 4 mảnh để nhận thưởng lớn\!"  
10. Button "Tiếp tục" hoặc "Đóng"  
11. **Background dimmed**  
12. **User Actions**:  
13. Click "Tiếp tục" hoặc "Đóng" → Quay về Screen 2 (Bản đồ tổng quát)  
14. **Special state**: Nếu đủ 4 mảnh → Popup này sẽ tự động chuyển thành popup "Hoàn thành" với thưởng lớn  
15. **Lưu ý**: Popup này có thể được tích hợp vào reward popup khi về đích để giảm số lượng màn hình

#### **Screen 6 – Check-in Popup (Popup điểm danh \- Tùy chọn)**

1. **Purpose**: Cho phép người chơi điểm danh nhiều lần trong ngày theo các mốc thời gian để nhận \+1 lượt mỗi lần (đơn giản hóa).  
2. **Components**:  
3. **Modal/Popup overlay** (chiếm 60-70% màn hình, center):  
4. Header: "Điểm danh nhận lộc" \+ Close button  
5. Icon điểm danh lớn  
6. Text: "Điểm danh tại các mốc thời gian để nhận \+1 lượt chơi mỗi lần\!"  
7. **Danh sách mốc thời gian** (ví dụ: 8h, 12h, 18h, 22h):  
8. Mỗi mốc hiển thị với trạng thái: "Đã điểm danh" (checkmark) hoặc "Chưa điểm danh" (button)  
9. Hiển thị thời gian còn lại đến mốc tiếp theo (nếu chưa đến mốc)  
10. **Status**:  
11. Nếu có mốc đang mở: Button "Điểm danh ngay" tại mốc đó  
12. Nếu đã điểm hết các mốc trong ngày: Text "Bạn đã điểm danh đủ các mốc hôm nay rồi" \+ Thời gian reset ngày mới  
13. Nếu chưa đến mốc tiếp theo: Text "Mốc tiếp theo: \[thời gian\]" \+ Countdown timer  
14. Button "Đóng"  
15. **Background dimmed**  
16. **User Actions**:  
17. Click "Điểm danh ngay" tại mốc đang mở → Animation checkmark đơn giản → Hiển thị "+1 lượt đã được cộng" → Cập nhật trạng thái mốc → Đóng popup và quay về Screen 2 (Bản đồ tổng quát)  
18. Click "Đóng" → Quay về Screen 2 (Bản đồ tổng quát)  
19. **Lưu ý**: Tính năng này chỉ làm nếu có thời gian dư. Có thể đơn giản hóa thành button trên Screen 2 (Bản đồ tổng quát) thay vì popup riêng

#### **Screen 7 – Mission Screen (LOẠI BỎ trong Phase 1\)**

1. **Purpose**: Tính năng này được loại bỏ trong Phase 1 để đảm bảo timeline 1 tuần.  
2. **Lý do**: Nhiệm vụ phức tạp cần tích hợp với nhiều hệ thống khác, tốn thời gian phát triển và test.  
3. **Thay thế**: Các nhiệm vụ đơn giản (như đăng nhập, hoàn thành vòng) sẽ tự động cộng thưởng mà không cần màn hình riêng.

#### **Screen 8 – Completion Popup (Popup hoàn thành 4 mảnh \- Đơn giản)**

1. **Purpose**: Popup đặc biệt khi người chơi hoàn thành đủ 4 mảnh ghép, trao thưởng lớn và reset vòng.  
2. **Components**:  
3. **Modal/Popup overlay** (chiếm 80-90% màn hình, center):  
4. Background màu Tết đặc biệt (đỏ vàng)  
5. Icon Tebbi lớn  
6. Text lớn: "Chúc mừng\! Tebbi đã hoàn thành Hành Trình Du Xuân Việt Nam \- Cưỡi ngựa vàng săn ngàn lộc\!"  
7. **Puzzle complete**: Hiển thị 4 mảnh ghép đã ghép thành bản đồ hoàn chỉnh (hình ảnh đơn giản)  
8. **Reward display**:  
9. Icon VNĐ lớn  
10. Số tiền thưởng lớn (50k-100k VNĐ)  
11. Text "Hoàn tiền vào ví thưởng"  
12. Button "Nhận thưởng và chơi tiếp"  
13. **Background dimmed**  
14. **User Actions**:  
15. Click "Nhận thưởng và chơi tiếp" → Trao thưởng → Reset vòng tự động → Đóng popup và quay về Screen 2 (Bản đồ tổng quát)  
16. **Animation**:  
17. Popup fade in với scale effect \+ sound effect đặc biệt  
18. Pháo hoa liên tục trong 5-10 giây  
19. Confetti rơi từ trên xuống trong 3-5 giây  
20. Animation ghép 4 mảnh thành bản đồ hoàn chỉnh

### **5.2 Visual Guideline (Hướng dẫn thiết kế)**

1. **Color (Màu sắc)**:  
2. **Màu chủ đạo**: Đỏ Tết (\#E53E3E, \#C53030) và Vàng (\#F6E05E, \#D69E2E) \- tạo cảm giác Tết truyền thống  
3. **Màu phụ**: Xanh lá (\#48BB78) cho bản đồ Việt Nam, Trắng (\#FFFFFF) cho background  
4. **Màu brand Tebbi**: Xanh lá cây (\#48BB78 hoặc màu xanh lá cây của brand Tebbi)  
5. **Màu trạng thái**:  
6. Success: Xanh lá (\#48BB78) \- cho thưởng, hoàn thành nhiệm vụ  
7. Warning: Vàng (\#F6E05E) \- cho cảnh báo hết lượt  
8. Info: Xanh dương (\#4299E1) \- cho thông tin  
9. Error: Đỏ (\#E53E3E) \- cho lỗi (hiếm khi dùng)  
10. **Màu action buttons**:  
11. Primary CTA: Đỏ Tết (\#E53E3E) với text trắng  
12. Secondary: Trắng với border đỏ  
13. Disabled: Xám (\#A0AEC0)  
14. **Font (Phông chữ)**:  
15. **Font family**:  
16. Tiêu đề: Font có tính vui tươi, phù hợp Tết (ví dụ: Montserrat Bold, hoặc font custom nếu có)  
17. Body: Font dễ đọc trên mobile (ví dụ: Inter, Roboto, hoặc system font)  
18. **Kích thước chữ**:  
19. Heading 1 (Tiêu đề màn hình): 24-28px  
20. Heading 2 (Tiêu đề section): 20-22px  
21. Body (Nội dung chính): 16px  
22. Caption (Ghi chú nhỏ): 14px  
23. Button text: 16-18px  
24. **Font weight**:  
25. Bold (700) cho tiêu đề và CTA  
26. Regular (400) cho body text  
27. Medium (500) cho text quan trọng  
28. **Animation (Hiệu ứng)**:  
29. **Xúc xắc quay**: 1-2 giây với CSS animation \+ sound effect (tiếng xúc xắc lăn)  
30. **Tebbi di chuyển**: 0.5-1 giây với fade out/in hoặc slide \+ sound effect (tiếng ngựa chạy)  
31. **Popup thưởng**: Fade in 0.3s \+ scale từ 0.9 → 1.0 (CSS transition) \+ sound effect (tiếng "ting" khi nhận thưởng)  
32. **Pháo hoa**: Hiệu ứng pháo hoa khi Tebbi dừng tại tỉnh mới và khi nhận thưởng lớn  
33. **Confetti animation**: Rơi từ trên xuống khi nhận thưởng lớn (hoàn thành 4 mảnh ghép)  
34. **Loading**: Spinner đơn giản khi đang tải dữ liệu  
35. **Button press**: Scale down 0.95 khi click, scale về 1.0 khi release (0.1s) \+ sound effect (tiếng click)  
36. **Nhạc game**: Nhạc nền Tết vui tươi phát liên tục trong game (có thể tắt/bật)  
37. **Note (Ghi chú)**:  
38. **Responsive design**:  
39. Mobile-first approach, tối ưu cho màn hình 375px \- 414px (iPhone)  
40. Hỗ trợ màn hình lớn hơn (tablet) nhưng không bắt buộc  
41. Touch-friendly: Button tối thiểu 44x44px, khoảng cách giữa các element đủ lớn  
42. **Accessibility**:  
43. Contrast ratio đạt WCAG AA (tối thiểu 4.5:1 cho text)  
44. Hỗ trợ screen reader với alt text cho icons và images  
45. Có thể điều hướng bằng keyboard (nếu có web version)  
46. **Performance (Đơn giản hóa)**:  
47. Load time màn hình đầu tiên \< 3 giây (cho phép linh hoạt hơn với timeline ngắn)  
48. Animation cơ bản, không cần đạt 60fps hoàn hảo (chấp nhận được nếu đơn giản)  
49. Optimize file size: Images \< 300KB, total bundle \< 1.5MB (cho phép linh hoạt hơn)  
50. **Brand guidelines**:  
51. Tuân thủ brand identity của Rovi Travel và Tebbi  
52. Sử dụng logo và màu sắc brand đúng quy định  
53. Giữ tone of voice nhất quán với brand (vui tươi, thân thiện)

**Tài liệu này được tạo bởi BA Team và cần được review bởi Product Manager, Tech Lead, và Design Team trước khi bắt đầu development.**

**Version**: 1.1 (Tinh chỉnh cho timeline 1 tuần)

**Last Updated**: \[Ngày cập nhật\]

**Owner**: BA Team

**Status**: Draft \- Pending Review

**Timeline**: 1 tuần (Phase 1\)

**Priority**: Must-have features được đánh dấu rõ ràng, các tính năng tùy chọn có thể làm sau

